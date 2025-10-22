import { hydrateRoot } from "react-dom/client";
import { parseJSX } from "../utils/formater.js";

const root = hydrateRoot(document, getInitialClientJSX);
let currentPathname = window.location.pathname;

function getInitialClientJSX() {
  const clientJSX = JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, reviveJSX);
  return clientJSX;
}

async function fetchJsx(pathname) {
  const res = await fetch(pathname + "?jsx=1");
  const jsxString = await res.text();
  const jsx = JSON.parse(jsxString, parseJSX);

  return jsx;
}

async function navigate(pathname) {
  const currentPathname = pathname;
  // Fetch HTML for the route we're navigating to.
  const jsx = await fetchJsx(pathname);

  if (pathname === currentPathname) {
    console.log("json string", jsx);
    root.render(jsx);
    // Get the part of HTML inside the <body> tag.
    // const bodyStartIndex = html.indexOf("<body>") + "<body>".length;
    // const bodyEndIndex = html.lastIndexOf("</body>");
    // const bodyHTML = html.slice(bodyStartIndex, bodyEndIndex);

    // // Replace the content on the page.
    // document.body.innerHTML = bodyHTML;
  }
}

window.addEventListener(
  "click",
  (e) => {
    // Only listen to link clicks.
    if (e.target.tagName !== "A") {
      return;
    }
    // Ignore "open in a new tab".
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    // Ignore external URLs.
    const href = e.target.getAttribute("href");
    if (!href.startsWith("/")) {
      return;
    }
    // Prevent the browser from reloading the page but update the URL.
    e.preventDefault();
    window.history.pushState(null, null, href);
    // Call our custom logic.
    navigate(href);
  },
  true
);

window.addEventListener("popstate", () => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
});
