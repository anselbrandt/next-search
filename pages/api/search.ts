import jsdom from "jsdom";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const filter = (html: string) => {
  return html
    .toString()
    .replace(
      /<head([\s\S]*?)<\/head>/g,
      '<head><meta charset="UTF-8" /></head>'
    )
    .replace(/<script([\s\S]*?)<\/script>/g, "")
    .replace(/<style([\s\S]*?)<\/style>/g, "")
    .replace(/<header([\s\S]*?)<\/header>/g, "")
    .replace(/<textarea([\s\S]*?)<\/textarea>/g, "")
    .replace(/<footer([\s\S]*?)<\/footer>/g, "")
    .replace(/class="([\s\S]*?)"/g, "")
    .replace(/class="([\s\S]*?)"/g, "")
    .replace(/�/g, "-");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const search = req.url?.replace("/api", "");
  const url = "https://google.com" + search;
  const response = await fetch(url);
  const text = await response.text();
  const filtered = filter(text);
  const { JSDOM } = jsdom;
  const dom = new JSDOM(filtered);
  const { document } = dom.window;
  const linksMap = new Map();
  const links = document.querySelectorAll("a");
  const linksArray = Array.from(links);
  const results = linksArray.filter((el) => el.href.includes("/url?q="));
  results.forEach((link, i) => {
    const href = link.href.replace("/url?q=", "");
    const title = link.parentElement?.textContent;
    const blurb = link.parentElement?.parentElement?.textContent;
    linksMap.set(i, {
      title: title,
      href: href,
      source: new URL(href).hostname,
      blurb: blurb,
    });
  });
  const json = Object.values(Object.fromEntries(linksMap));
  res.status(200).json(json);
}
