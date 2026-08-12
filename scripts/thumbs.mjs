/*
 * Captures the work index hover thumbnails from the site's own renders.
 *
 * This site draws its exhibits in HTML rather than screenshotting them, and that
 * rule is about not passing off someone else's screen as a rebuild. Photographing
 * my own rebuild to make a 150px thumbnail is the other direction entirely, and
 * it is the only way to get one: the renders are hundreds of nodes deep and do
 * not survive being shrunk to a strip live.
 *
 * A script rather than two files dragged in by hand, so the thumbnails are
 * reproducible. Change a render and re-run this; nothing goes stale silently.
 *
 * Run: npm run thumbs   (requires npm run build first)
 */
import { readFile, rm, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { startServer } from "./serve.mjs";

/*
 * The ratio of the 150x78 box the row animates open. Captures are cropped to it
 * so the thumbnail is composed rather than object-fit into shape by the browser.
 */
const OUT_WIDTH = 600;
const OUT_HEIGHT = 312;

/*
 * What every thumbnail source is normalised to. Well above the 150px box, so
 * there is room on a retina display and for next/image to pick its own sizes,
 * and well under the 1905px one of them arrived at.
 */
const THUMB_SOURCE_WIDTH = 1320;

/*
 * One per row that has no photograph of its own. Blitz has a real screenshot of
 * a real site, so it is not here; these two are systems that only exist on this
 * page as rebuilds.
 *
 * `clip` is in the element's own coordinates: the top strip of each render,
 * where the thing is recognisable. Taking the whole element gives a tall page
 * that reads as grey mush at thumbnail size.
 */
const SHOTS = [
  {
    out: "public/work/sales-dashboard.png",
    selector: '[data-thumb="sales"]',
    label: "sales platform dashboard",
  },
  {
    out: "public/work/research-home.png",
    selector: '[data-thumb="research"]',
    label: "institute home screen",
  },
];

/*
 * Sources that cannot be recaptured from this page, brought to the same width as
 * the ones that can. The Blitz thumbnail is a photograph of the real client site
 * and arrived at 1905x1020 in 1.4 MB, which is nine times the width of the box
 * it opens into. next/image was resizing it on the way out so no visitor ever
 * paid for that, but it is still 1.4 MB in the repository, and it is 1.4 MB the
 * build has to decode on every cold optimise.
 */
/*
 * JPEG, not PNG. The two captures above are interface screenshots: flat fills
 * and hard edges, which is the case PNG is good at, and they land near 100 KB.
 * This one is a photograph of a real page with a photographic hero in it, and
 * PNG kept it at 926 KB even after the resize, nine times the others at the same
 * width. next/image re-encodes everything to AVIF on the way out, so no visitor
 * was paying that; the repository and every cold build were.
 */
const RESIZE = [
  {
    from: "public/work/blitz-packaging.png",
    to: "public/work/blitz-packaging.jpg",
    width: THUMB_SOURCE_WIDTH,
    type: "image/jpeg",
    quality: 0.9,
  },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/*
 * Canvas in the page already open, rather than a new image dependency for one
 * file. Idempotent: once `from` has been consumed and deleted, a re-run sees the
 * output already in place and says so instead of failing.
 */
async function normalise(page, { from, to, width, type, quality }) {
  let source;
  try {
    source = await readFile(from);
  } catch {
    console.log(`SKIP  ${to} already converted`);
    return;
  }

  const dataUrl = `data:image/png;base64,${source.toString("base64")}`;
  const out = await page.evaluate(
    async ([src, w, mime, q]) => {
      const img = new Image();
      img.src = src;
      await img.decode();

      const canvas = document.createElement("canvas");
      canvas.width = Math.min(w, img.naturalWidth);
      canvas.height = Math.round((img.naturalHeight * canvas.width) / img.naturalWidth);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL(mime, q);
    },
    [dataUrl, width, type, quality],
  );

  const bytes = Buffer.from(out.split(",")[1], "base64");
  await writeFile(to, bytes);
  if (to !== from) await rm(from);
  console.log(
    `OK    ${to}  ${Math.round(source.length / 1024)} KB → ${Math.round(bytes.length / 1024)} KB`,
  );
}

const { base: BASE, stop } = await startServer();
const browser = await chromium.launch();
let failed = 0;

try {
  /*
   * Reduced motion for the same reason the a11y run uses it: every render on
   * this page starts at opacity 0 and reveals on scroll. Left to animate, a
   * capture races the observer and comes back blank. globals.css resolves
   * .reveal to its final state under this preference.
   */
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(BASE + "/design", { waitUntil: "networkidle" });
  await wait(600);

  for (const shot of SHOTS) {
    const el = page.locator(shot.selector).first();
    if ((await el.count()) === 0) {
      console.log(`MISS  ${shot.selector} matched nothing (${shot.label})`);
      failed += 1;
      continue;
    }

    await el.scrollIntoViewIfNeeded();
    await wait(300);

    const box = await el.boundingBox();
    if (!box) {
      console.log(`MISS  ${shot.selector} has no box (${shot.label})`);
      failed += 1;
      continue;
    }

    /* Crop to the aspect ratio of the row's box, off the top of the render. */
    const height = Math.min(box.height, (box.width * OUT_HEIGHT) / OUT_WIDTH);
    await page.screenshot({
      path: shot.out,
      clip: { x: box.x, y: box.y, width: box.width, height },
      scale: "css",
    });
    console.log(`OK    ${shot.out}  (${Math.round(box.width)}x${Math.round(height)} css px)`);
  }

  for (const item of RESIZE) {
    await normalise(page, item);
  }

  await context.close();
} finally {
  await browser.close();
  stop();
}

console.log("\nThumbnails are captured at 2x and cropped to the row's ratio.");
process.exit(failed > 0 ? 1 : 0);
