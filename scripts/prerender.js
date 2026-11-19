// Gives each page its own HTML, so crawlers get its content, title and canonical without running JavaScript.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const { render, mods, modHead, notFoundTitle } = await import('../dist-ssr/entry-server.js');
const template = await readFile('dist/index.html', 'utf8');

const pages = [
  { url: '/', file: 'index.html' },
  ...mods.map((mod) => ({ url: `/mods/${mod.slug}`, file: `mods/${mod.slug}.html`, head: modHead(mod) })),
  { url: '/404', file: '404.html', head: { title: notFoundTitle }, noCanonical: true },
];

function escape(text) {
  return text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`dist/index.html has no match for ${pattern}`);
  return html.replace(pattern, replacement);
}

function setAttribute(html, key, value) {
  const pattern = new RegExp(`(${key}\\s+(?:content|href)=")[^"]*`);
  return replaceOnce(html, pattern, (_, start) => start + escape(value));
}

for (const page of pages) {
  let html = replaceOnce(template, /<div id="root"><\/div>/, () => `<div id="root">${render(page.url)}</div>`);
  const { title, description, canonical } = page.head ?? {};
  if (title) {
    html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${escape(title)}</title>`);
    html = setAttribute(html, 'property="og:title"', title);
  }
  if (description) {
    html = setAttribute(html, 'name="description"', description);
    html = setAttribute(html, 'property="og:description"', description);
  }
  if (canonical) {
    html = setAttribute(html, 'rel="canonical"', canonical);
    html = setAttribute(html, 'property="og:url"', canonical);
  }
  if (page.noCanonical) {
    html = replaceOnce(html, /\s*<link rel="canonical"[^>]*>/, '');
  }
  const out = resolve('dist', page.file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
}
