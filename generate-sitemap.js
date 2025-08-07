const fs = require('fs');
const path = require('path');

// 👉 Đường dẫn thư mục hiện tại (nơi chứa index.html v.v)
const htmlDir = __dirname; 

// 👉 Domain gốc
const baseUrl = 'https://msc.edu.vn';

function getHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const slug = file === 'index.html' ? '' : `/${file.replace('.html', '')}`;
      return `${baseUrl}${slug}`;
    });
}

const urls = getHtmlFiles(htmlDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url><loc>${url}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(htmlDir, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap created at sitemap.xml');
