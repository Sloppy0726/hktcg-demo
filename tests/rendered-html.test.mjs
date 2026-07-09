import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the HKTCG destination homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>HKTCG — Play\. Collect\. Connect\.<\/title>/i);
  assert.match(html, /Enter[\s\S]*Hong Kong[’']s[\s\S]*card destination\./i);
  assert.match(html, /The T stands[\s\S]*for Trading\./i);
  assert.match(html, /Skip walkthrough/i);
  assert.match(html, /Plan your visit/i);
  assert.match(html, /2\/F, iSQUARE, 63 Nathan Road/i);
  assert.match(html, /Bring a deck[\s\S]*Join the table/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps the finished homepage free of starter preview infrastructure", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /HomeExperience/);
  assert.match(layout, /HKTCG — Play\. Collect\. Connect\./);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
