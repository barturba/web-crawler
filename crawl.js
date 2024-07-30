import url from "node:url";
import { JSDOM } from "jsdom";

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
  const baseURLHostname = new URL(baseURL).hostname;
  const currURLHostname = new URL(currentURL).hostname;
  if (baseURLHostname !== currURLHostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  var text = "";
  try {
    text = await fetchURL(currentURL);
  } catch (error) {
    console.error(error.message);
    exit();
  }

  var links = "";
  try {
    links = await getURLsFromHTML(text, baseURL);
  } catch (error) {
    console.error(error.message);
    exit();
  }

  for (const url of links) {
    pages = await crawlPage(baseURL, url, pages);
  }

  return pages;
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

export { normalizeURL, getURLsFromHTML, crawlPage };
