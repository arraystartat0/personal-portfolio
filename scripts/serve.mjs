/*
 * Starts `next start` for a checking script, and proves the thing that answers
 * is the build sitting in .next right now.
 *
 * Both scripts here used to open a hard-coded port, poll it until something
 * replied, and trust whatever did. On Windows `server.kill()` kills the shell
 * npx runs in and leaves the actual server behind, so those ports accumulate
 * orphans across sessions; the next run then fails to bind, finds the orphan
 * already answering, and audits a build from days ago. It reports PASS. The
 * failure is silent by construction, which for the script backing this site's
 * WCAG claim is the worst property it could have.
 *
 * So: take a port the OS says is free, and check the BUILD_ID that comes back
 * against the one on disk. If a stranger answers, stop rather than measure it.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** A port the OS just confirmed nothing holds. */
function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.unref();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

/*
 * Next stamps the build id into every page it serves, as a comment immediately
 * after the doctype: <!DOCTYPE html><!--5UOpyMJ...-->. Asking whether the id on
 * disk appears in the response is what turns "something replied" into "my build
 * replied", and it beats parsing the comment out, which would need this to keep
 * up with wherever Next decides to put it next.
 */
async function servesBuild(base, buildId) {
  const html = await (await fetch(base)).text();
  return html.includes(buildId);
}

/**
 * Boots the production server and hands back its base URL and a stop().
 * Throws rather than returning a server it could not identify.
 */
export async function startServer() {
  const expected = (await readFile(new URL("../.next/BUILD_ID", import.meta.url), "utf8")).trim();
  const port = await freePort();
  const base = `http://127.0.0.1:${port}`;

  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    stdio: "ignore",
    shell: process.platform === "win32",
  });

  /*
   * Kills the tree, not the shell. Without /T the npx wrapper dies and the
   * server it started keeps the port, which is the leak this file exists to
   * stop happening again.
   */
  const stop = () => {
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      child.kill();
    }
  };

  let up = false;
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(base);
      if (res.ok) {
        up = true;
        break;
      }
    } catch {
      /* not up yet */
    }
    await wait(500);
  }

  if (!up) {
    stop();
    throw new Error(`next start did not come up on ${base}`);
  }

  if (!(await servesBuild(base, expected))) {
    stop();
    throw new Error(
      `${base} is answering, but not with build ${expected} from .next. ` +
        "Something else is on that port; nothing measured here would be about this build.",
    );
  }

  return { base, stop };
}
