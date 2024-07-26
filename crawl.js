import url from "node:url";

// expecting normalized output
function normalizeURL(inputURL) {
  const myURL = new URL(inputURL);
  console.log(`myURL: ${myURL}`);
  console.log(`myURL.protocol: ${myURL.protocol}`);
  console.log(`myURL.hostname: ${myURL.hostname}`);
  console.log(`myURL.port: ${myURL.port}`);
  console.log(`myURL.pathname: ${myURL.pathname}`);
  return inputURL;
}
export { normalizeURL };
