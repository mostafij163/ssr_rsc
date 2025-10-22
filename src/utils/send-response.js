import fs from "fs/promises";
import renderJSXToClientJSX from "../lib/render-jsx-to-client-jsx.js";
import { stringifyJSX } from "./formater.js";
import renderJSXToHTML from "../lib/render-jsx-to-html.js";

export async function sendScript(res, filename) {
  const content = await fs.readFile(filename, "utf8");
  res.setHeader("Content-Type", "text/javascript");
  res.end(content);
}

export async function sendHtml(res, jsx) {
  let html = renderJSXToHTML(jsx);
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);

  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
  html += JSON.stringify(clientJSXString).replace(/</g, "\\u003c");
  html += `</script>`;
  html += `
    <script type="importmap">
      {
        "imports": {
           "react": "https://esm.sh/react@canary",
          "react-dom/client": "https://esm.sh/react-dom@canary/client"
        }
      }
    </script>
    <script type="module" src="/client.js"></script>
  `;
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}

export async function sendJSX(res, jsx) {
  const clientJsx = await renderJSXToClientJSX(jsx);
  const jsxString = JSON.stringify(clientJsx, stringifyJSX);
  res.setHeader("Content-Type", "application/json");
  res.end(jsxString);
}
