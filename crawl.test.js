import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("https://blog.boot.dev/path/", () => {
  const got = normalizeURL("https://blog.boot.dev/path/");
  const want = "blog.boot.dev/path";
  expect(got).toBe(want);
});

test("https://blog.boot.dev/path", () => {
  const got = normalizeURL("https://blog.boot.dev/path");
  const want = "blog.boot.dev/path";
  expect(got).toBe(want);
});

test("http://blog.boot.dev/path/", () => {
  const got = normalizeURL("http://blog.boot.dev/path/");
  const want = "blog.boot.dev/path";
  expect(got).toBe(want);
});

test("http://blog.boot.dev/path", () => {
  const got = normalizeURL("http://blog.boot.dev/path");
  const want = "blog.boot.dev/path";
  expect(got).toBe(want);
});

test("normalize path", () => {
  const got = normalizeURL("https://sub.example.com/p/a/t/h/");
  const want = "sub.example.com/p/a/t/h";
  expect(got).toBe(want);
});

test("getURLsFromHTML", () => {
  const got = getURLsFromHTML(
    '<html><body><a href="test.html"><span>Go to Boot.dev</span></a><a href="learn.html">Learn Backend Development</a></body></html>',
    "https://sub.example.com/"
  );
  const want = [
    "https://sub.example.com/test.html",
    "https://sub.example.com/learn.html",
  ];

  expect(got).toStrictEqual(want);
});
