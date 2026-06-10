import { access, readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "assets/favicon.svg",
  "assets/social-card.png",
  "src/styles/main.css",
  "src/js/main.js",
  "src/js/navigation.js",
  "src/js/reveal.js",
];

const index = await readFile(resolve(root, "index.html"), "utf8");

test("all production files exist", async () => {
  await Promise.all(requiredFiles.map((file) => access(resolve(root, file))));
});

test("document has core semantic landmarks", () => {
  for (const landmark of ["<header", "<nav", "<main", "<footer"]) {
    assert.match(index, new RegExp(landmark));
  }
});

test("every internal section link has a destination", () => {
  const links = [...index.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  const ids = new Set([...index.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));

  for (const link of links) {
    assert.ok(ids.has(link), `Missing destination for #${link}`);
  }
});

test("external links opened in a new tab are protected", () => {
  const externalLinks = [...index.matchAll(/<a[\s\S]*?target="_blank"[\s\S]*?<\/a>/g)];
  assert.ok(externalLinks.length > 0);

  for (const [link] of externalLinks) {
    assert.match(link, /rel="noopener noreferrer"/);
  }
});

test("there is no downloadable CV or PDF reference", () => {
  assert.doesNotMatch(index, /download|\.pdf/i);
});

test("the AI agent skill is represented in visible and structured content", () => {
  assert.match(index, /AI coding agents \(Codex\)/);
  assert.match(index, /"OpenAI Codex"/);
});

test("local asset references use supported file types", () => {
  const references = [...index.matchAll(/(?:href|src)="\.\/([^"#?]+)"/g)].map(
    (match) => match[1],
  );
  const allowed = new Set([".css", ".js", ".svg", ".png", ".webmanifest"]);

  for (const reference of references) {
    assert.ok(allowed.has(extname(reference)), `Unexpected asset type: ${reference}`);
  }
});
