import jsdom from "jsdom";

export const filter = (html: string) => {
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
    .replace(/�/g, "-")
    .replace(/- -/g, "-");
};

const trim = (str: string) => {
  let trimmed = str;
  if (trimmed.substring(0, 2) === " -") {
    trimmed = trimmed.slice(2);
  }
  if (trimmed.substring(trimmed.length - 2, trimmed.length) === "- ") {
    trimmed = trimmed.slice(0, trimmed.length - 2);
  }
  return trimmed;
};

export const parse = (html: string) => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const linksMap = new Map();
  const links = document.querySelectorAll("a");
  const linksArray = Array.from(links);
  const results = linksArray.filter((el) => el.href.includes("/url?q="));
  results.forEach((link, i) => {
    const href = link.href.replace("/url?q=", "");
    const title = link.parentElement?.textContent;
    const blurb = link.parentElement?.parentElement?.textContent?.replace(
      title!,
      ""
    );
    linksMap.set(i, {
      title: title,
      href: decodeURIComponent(href).split("&")[0],
      source: new URL(href).hostname,
      blurb: trim(blurb!),
    });
  });
  const linksObject = Object.fromEntries(linksMap);
  return Object.values(linksObject);
};
