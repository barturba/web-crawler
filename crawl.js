import url from "node:url";
import { JSDOM } from "jsdom";

// expecting normalized output
function normalizeURL(inputURL) {
  const myURL = new URL(inputURL);
  return `${myURL.hostname}${myURL.pathname}`.replace(/\/$/, "");
}

function getURLsFromHTML(html, baseURL) {
  const urls = [];
  const dom = new JSDOM(html);
  const anchors = dom.window.document.querySelectorAll("a");

  for (const anchor of anchors) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href;
        urls.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }

  return urls;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  // 1. make sure currentURL is the same domain as the baseURL. If it's not, just
  // return the current pages. We don't want to crawl the entire internet,
  // just the domain in question.
  //
  // 2. Get a normalized version of the currentURL.
  //
  // 3. If the pages object already has an entry for the normalized version of
  // the current URL, just increment the count and return the current pages.
  //
  // 4. Otherwise, add an entry to the pages object for the normalized version
  // of the current URL, and set the count to 1.
  //
  // 5. If you've gotten here, break out the logic for fetching the current URL
  // and parsing the HTML into its own function. This will keep the crawl
  // functionality readable and manageable. Call the new function inside
  // crawlPage.
  //
  // 6. Assuming all went well with the fetch request in the new function, get
  // all the urls from the response body html.
  //
  // 7. Recursively crawl each url you found on the page and update the pages to
  // keep and aggregate count.
  //
  // 8. Finally, return the updated pages object.

  // 1. make sure currentURL is the same domain as the baseURL. If it's not, just
  // return the current pages. We don't want to crawl the entire internet,
  // just the domain in question.
  // 1. check domain
  const baseURLHostname = new URL(baseURL).hostname;
  const currURLHostname = new URL(currentURL).hostname;
  if (baseURLHostname !== currURLHostname) {
    return pages;
  }

  //
  // 2. Get a normalized version of the currentURL.

  const normalizedURL = normalizeURL(currentURL);
  console.log(`normalizedURL: ${normalizedURL}`);

  //
  // 3. If the pages object already has an entry for the normalized version of
  // the current URL, just increment the count and return the current pages.
  if (containsObject(pages, normalizedURL)) {
    pages[normalizedURL] += 1;
    return pages;
  }

  //
  // 4. Otherwise, add an entry to the pages object for the normalized version
  // of the current URL, and set the count to 1.

  pages[normalizedURL] = 1;
  console.log(`pages: ${JSON.stringify(pages)}`);
  var text = "";
  try {
    text = await fetchURL(currentURL);
  } catch (error) {
    console.error(error.message);
  }
  // console.log(`text: ${JSON.stringify(text)}`);
  //
  // 5. If you've gotten here, break out the logic for fetching the current URL
  // and parsing the HTML into its own function. This will keep the crawl
  // functionality readable and manageable. Call the new function inside
  // crawlPage.
  var links = "";
  try {
    links = await getURLsFromHTML(text, baseURL);
  } catch (error) {
    console.error(error.message);
  }
  console.log(`links: ${JSON.stringify(links, 0, 2)}`);

  //
  // 6. Assuming all went well with the fetch request in the new function, get
  // all the urls from the response body html.
  //
  // 7. Recursively crawl each url you found on the page and update the pages to
  // keep and aggregate count.
  //
  // 8. Finally, return the updated pages object.

  // try {
  //   const response = await fetch(currentURL);
  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }
  //   const contentType = response.headers.get("content-type");
  //   if (!contentType || !contentType.includes("text/html")) {
  //     throw new TypeError("Oops, we haven't got HTML!");
  //   }
  //   const text = await response.text();
  //   console.log(text);
  // } catch (error) {
  //   console.error(error.message);
  // }
}
async function fetchURL(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      throw new TypeError("Oops, we haven't got HTML!");
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(error.message);
  }
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
