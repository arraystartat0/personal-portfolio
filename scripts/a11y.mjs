/*
 * WCAG 2.1 AA audit of the built site, in a real browser.
 *
 * A real engine rather than jsdom, because the three checks this project could
 * not do by hand all need layout and paint: colour contrast resolves computed
 * colours against what is actually painted behind them, reflow needs a viewport,
 * and both are exactly where a hand audit stops being trustworthy.
 *
 * Run: npm run a11y   (requires npm run build first)
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const PORT = 4321;
const BASE = `http://127.0.0.1:${PORT}`;
const ROUTES = ["/", "/design", "/swe", "/embedded"];

/* The four tags that together are WCAG 2.1 Level AA. */
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

/* Desktop, then the 320px width SC 1.4.10 Reflow is written against. */
const VIEWPORTS = [
  { name: "desktop 1440", width: 1440, height: 1000 },
  { name: "reflow 320", width: 320, height: 640 },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function serve() {
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "ignore",
    shell: process.platform === "win32",
  });
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return server;
    } catch {
      /* not up yet */
    }
    await wait(500);
  }
  server.kill();
  throw new Error("next start did not come up on " + BASE);
}

/*
 * Everything folded away is still content, and <details> is how this site hides
 * its source lists and disclaimers. axe skips what is not rendered, so a run
 * that leaves them shut audits less of the page than a reader sees.
 */
const openDisclosures = (page) =>
  page.evaluate(() => {
    document.querySelectorAll("details").forEach((d) => {
      d.open = true;
    });
  });

const server = await serve();
const browser = await chromium.launch();
let violations = 0;
let incomplete = 0;
const overflowing = [];

try {
  for (const vp of VIEWPORTS) {
    /*
     * Reduced motion, deliberately. Every revealing element on this site starts
     * at opacity 0, and axe cannot compute a contrast ratio through a
     * transparent element: left to animate, most of a long page reports as
     * "incomplete" rather than as pass or fail. globals.css resolves .reveal to
     * its final state under this preference, so the whole page is measurable.
     */
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: "reduce",
    });

    for (const route of ROUTES) {
      const page = await context.newPage();
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await openDisclosures(page);
      await wait(400);

      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

      const head = `${route}  @ ${vp.name}`;
      if (results.violations.length === 0) {
        console.log(`PASS  ${head}  (${results.passes.length} checks passed)`);
      } else {
        console.log(`FAIL  ${head}`);
        for (const v of results.violations) {
          violations += 1;
          console.log(`  [${v.impact}] ${v.id} — ${v.help}  (${v.nodes.length} nodes)`);
          for (const n of v.nodes.slice(0, 4)) {
            console.log(`      ${n.target.join(" ")}`);
            const msg = (n.failureSummary || "").split("\n").filter(Boolean).pop();
            if (msg) console.log(`        ${msg.trim()}`);
          }
        }
      }

      /* Reported, not counted as failures: these need a human decision. */
      for (const inc of results.incomplete) {
        incomplete += 1;
        console.log(`  NEEDS REVIEW  ${inc.id} — ${inc.help} (${inc.nodes.length} nodes)`);
        for (const n of inc.nodes.slice(0, 3)) {
          console.log(`      ${n.target.join(" ")}`);
          const why = (n.any || []).map((c) => c.message).filter(Boolean)[0];
          if (why) console.log(`        ${why.split("\n")[0].trim()}`);
        }
      }

      /*
       * SC 1.4.10, measured after axe rather than before it. axe has just walked
       * and measured every node on this page, which is proof the stylesheets are
       * live; probing beforehand caught a cold context mid-load, where an
       * unstyled table sizes to its content and the page reports a 900px pan
       * that no styled run ever shows.
       */
      if (vp.width === 320) {
        const report = await page.evaluate(() => {
          const wraps = [...document.querySelectorAll('[class*="tableWrap"]')];
          if (wraps.some((w) => getComputedStyle(w).overflowX === "visible")) return "unstyled";

          window.scrollTo(9999, 0);
          const x = Math.round(window.scrollX);
          const culprits = [];
          if (x > 1) {
            for (const el of document.querySelectorAll("body *")) {
              const b = el.getBoundingClientRect();
              if (b.width > 330 && b.right > window.innerWidth - 60) {
                culprits.push(
                  el.tagName.toLowerCase() +
                    "." +
                    (el.className || "").toString().split(" ")[0].slice(-28) +
                    ` w=${Math.round(b.width)}`,
                );
              }
            }
          }
          window.scrollTo(0, 0);
          if (x <= 1) return null;
          return { pannedBy: x, width: document.documentElement.scrollWidth, culprits: culprits.slice(0, 8) };
        });

        if (report === "unstyled") {
          console.log(`  SKIPPED reflow on ${route}: stylesheets not applied`);
        } else if (report) {
          overflowing.push({ route, ...report });
        }
      }

      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
  server.kill();
}

console.log("\n" + "-".repeat(60));
if (overflowing.length) {
  for (const o of overflowing) {
    console.log(
      `1.4.10 Reflow: ${o.route} pans ${o.pannedBy}px sideways at 320px (document ${o.width}px)`,
    );
    for (const c of o.culprits) console.log(`    ${c}`);
  }
} else {
  console.log("1.4.10 Reflow: no horizontal scroll at 320px on any route");
}
console.log(`Violations: ${violations}   Needs review: ${incomplete}`);
process.exit(violations > 0 ? 1 : 0);
