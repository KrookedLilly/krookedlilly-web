// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, ...) that the
// site's pages changed, so they recrawl right away instead of whenever they
// get around to it. Bing's index also feeds ChatGPT search and Copilot.
//
// Runs automatically after `npm run deploy` (the "postdeploy" script). It waits
// until GitHub Pages is serving the build that was just deployed (matched by the
// vite-react-ssg build hash), then submits every URL in dist/sitemap.xml.
// Never fails the deploy: problems are reported and skipped.
//
// The key is the 32-hex-character file in public/ (IndexNow keys are public by
// design; the file just proves we own the domain). Rerun by hand with:
//   node scripts/indexnow.mjs
import fs from "node:fs";
import path from "node:path";

const HOST = "www.krookedlilly.com";
const ORIGIN = `https://${HOST}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const buildHash = (html) => html.match(/__VITE_REACT_SSG_HASH__ = '([^']+)'/)?.[1];

const keyFile = fs.readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.warn("IndexNow: no key file in public/, skipped.");
  process.exit(0);
}
const key = keyFile.slice(0, -4);
const keyLocation = `${ORIGIN}/${keyFile}`;
const urls = [...fs.readFileSync(path.join("dist", "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expected = buildHash(fs.readFileSync(path.join("dist", "index.html"), "utf8"));

// GitHub Pages usually publishes within a minute or two; give it up to 5.
console.log("IndexNow: waiting for the new build to go live...");
let live = false;
for (let i = 0; i < 30 && !live; i++) {
  try {
    const [page, keyRes] = await Promise.all([
      fetch(`${ORIGIN}/?cb=${Date.now()}`).then((r) => r.text()),
      fetch(`${keyLocation}?cb=${Date.now()}`),
    ]);
    live = buildHash(page) === expected && keyRes.ok && (await keyRes.text()).trim() === key;
  } catch {
    // network hiccup; try again
  }
  if (!live) await sleep(10_000);
}
if (!live) {
  console.warn("IndexNow: new build not live after 5 minutes, skipped. Rerun: node scripts/indexnow.mjs");
  process.exit(0);
}

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation, urlList: urls }),
  });
  // 200 = accepted, 202 = accepted, key validation pending (normal the first time)
  console.log(`IndexNow: submitted ${urls.length} URLs -> HTTP ${res.status}${res.ok ? "" : ` ${await res.text()}`}`);
} catch (e) {
  console.warn(`IndexNow: submit failed (${e.message}), skipped.`);
}
