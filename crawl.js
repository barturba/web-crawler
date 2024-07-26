import url from "node:url";

// expecting normalized output
function normalizeURL(inputURL) {
  const myURL = new URL(inputURL);
  return `${myURL.hostname}${myURL.pathname}`.replace(/\/$/, "");
}
export { normalizeURL };
