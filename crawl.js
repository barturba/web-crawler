import url from "node:url";
import { JSDOM } from "jsdom";

// expecting normalized output
function normalizeURL(inputURL) {
  const myURL = new URL(inputURL);
  return `${myURL.hostname}${myURL.pathname}`.replace(/\/$/, "");
}

function getURLsFromHTML(htmlString, rootURL) {
  //   console.log(`htmlString: ${htmlString} rootURL: ${rootURL}`);
  const dom = new JSDOM(htmlString);
  //   const linkSelectors = dom.window.document.querySelectorAll("a");
  //   console.log(`linkSelectors: ${JSON.stringify(linkSelectors)}`);

  var urls = [];

  dom.window.document.querySelectorAll("a").forEach((link) => {
    urls.push(rootURL + link.href);
  });
  return urls;
}

export { normalizeURL, getURLsFromHTML };
