import render from "../lib/render.js"
import fs from "fs/promises"

export async function sendScript(res, filename) {
  const content = await fs.readFile(filename, "utf8");
  console.log("content")
  res.setHeader("Content-Type", "text/javascript");
  res.end(content);
}

export async function sendHtml(res, jsx) {
  let html = await render(jsx);
  html += `<script type="module" src="/client.js"></script>`;
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
