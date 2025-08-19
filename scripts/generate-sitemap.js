/**
 * Simple sitemap generator for the Agent app.
 * Reads base URL from env SITE_URL or package.json homepage,
 * then writes public/sitemap/sitemap.xml and ensures robots.txt has the Sitemap line.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITEMAP_DIR = path.join(PUBLIC_DIR, 'sitemap');
const SITEMAP_PATH = path.join(SITEMAP_DIR, 'sitemap.xml');
const ROBOTS_PATH = path.join(PUBLIC_DIR, 'robots.txt');

function getBaseUrl() {
  const envUrl = process.env.SITE_URL || process.env.REACT_APP_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    if (pkg.homepage) return String(pkg.homepage).replace(/\/$/, '');
  } catch {}
  return 'https://drjoints.in';
}

// Update these routes as your site grows
const staticRoutes = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 }
  // add more when you add public pages
];

function formatDate(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function buildXml(baseUrl) {
  const items = staticRoutes
    .map(r => `   <url>\n      <loc>${baseUrl}${r.loc}</loc>\n      <lastmod>${formatDate()}</lastmod>\n      <changefreq>${r.changefreq}</changefreq>\n      <priority>${r.priority}</priority>\n   </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function upsertRobots(baseUrl) {
  let content = '';
  if (fs.existsSync(ROBOTS_PATH)) {
    content = fs.readFileSync(ROBOTS_PATH, 'utf8');
  }
  const sitemapLine = `Sitemap: ${baseUrl}/sitemap/sitemap.xml`;
  const hasSitemap = content.split(/\r?\n/).some(l => l.trim().toLowerCase().startsWith('sitemap:'));
  if (!hasSitemap) {
    content = (content.trim() + '\n\n# Sitemap\n' + sitemapLine + '\n').trim() + '\n';
  } else {
    // Replace existing sitemap line(s)
    content = content
      .split(/\r?\n/)
      .map(l => (l.trim().toLowerCase().startsWith('sitemap:') ? sitemapLine : l))
      .join('\n') + '\n';
  }
  fs.writeFileSync(ROBOTS_PATH, content, 'utf8');
}

function main() {
  const baseUrl = getBaseUrl();
  ensureDir(SITEMAP_DIR);
  const xml = buildXml(baseUrl);
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  upsertRobots(baseUrl);
  console.log(`Sitemap written: ${SITEMAP_PATH}`);
  console.log(`Robots updated: ${ROBOTS_PATH}`);
  console.log(`Base URL: ${baseUrl}`);
}

main();
