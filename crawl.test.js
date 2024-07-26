import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test("normalize path", () => {
  const got = normalizeURL("https://sub.example.com/p/a/t/h?query=string#hash");
  const want = "sub.example.com:8080/p/a/t/h";
  expect(got).toBe(want);
});

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
