import { argv, exit } from "node:process";
import { crawlPage } from "./crawl.js";

async function main() {
  if (argv.length < 3) {
    console.log("number of arguments less than 1");
    exit();
  } else if (argv.length > 3) {
    console.log("number of arguments greater than 1");
    exit();
  }

  const baseURL = argv[2];
  console.log(`starting at base URL: ${baseURL}`);
  try {
    var pages = await crawlPage(baseURL);
    console.log(JSON.stringify(pages, 0, 2));
  } catch (error) {
    console.error(error.message);
    exit();
  }
}

main();
