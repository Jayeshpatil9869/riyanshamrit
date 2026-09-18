const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

function findFile(rawPath) {
  // Strip query string and hash
  const urlPath = decodeURIComponent(rawPath.split('?')[0].split('#')[0]);

  if (urlPath === '/' || urlPath === '') {
    return path.join(ROOT_DIR, 'index.html');
  }

  // Remove leading slash for local relative paths
  const relPath = urlPath.replace(/^\//, '');

  // 1. Direct path from root
  const direct = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
    return direct;
  }

  // 2. Check inside framerusercontent.com
  const inFramer = path.join(ROOT_DIR, 'framerusercontent.com', relPath);
  if (fs.existsSync(inFramer) && fs.statSync(inFramer).isFile()) {
    return inFramer;
  }

  // 3. Check inside framerusercontent.com/sites/5nbbvYiLbGC0hTvXbvSAw
  const inSite = path.join(ROOT_DIR, 'framerusercontent.com', 'sites', '5nbbvYiLbGC0hTvXbvSAw', relPath);
  if (fs.existsSync(inSite) && fs.statSync(inSite).isFile()) {
    return inSite;
  }

  // 4. Check inside unpkg.com
  const inUnpkg = path.join(ROOT_DIR, 'unpkg.com', relPath);
  if (fs.existsSync(inUnpkg) && fs.statSync(inUnpkg).isFile()) {
    return inUnpkg;
  }

  // 5. Check inside fonts.gstatic.com
  const inFonts = path.join(ROOT_DIR, 'fonts.gstatic.com', relPath);
  if (fs.existsSync(inFonts) && fs.statSync(inFonts).isFile()) {
    return inFonts;
  }

  // 6. Check inside app.framerstatic.com
  const inStatic = path.join(ROOT_DIR, 'app.framerstatic.com', relPath);
  if (fs.existsSync(inStatic) && fs.statSync(inStatic).isFile()) {
    return inStatic;
  }

  // 7. Check inside images
  const inImages = path.join(ROOT_DIR, 'framerusercontent.com', 'images', path.basename(relPath));
  if (fs.existsSync(inImages) && fs.statSync(inImages).isFile()) {
    return inImages;
  }

  // 8. Check inside assets
  const inAssets = path.join(ROOT_DIR, 'framerusercontent.com', 'assets', path.basename(relPath));
  if (fs.existsSync(inAssets) && fs.statSync(inAssets).isFile()) {
    return inAssets;
  }

  // If no extension (client-side route like /shop, /about, /faq), serve index.html
  if (!path.extname(relPath)) {
    const rootIndex = path.join(ROOT_DIR, 'index.html');
    if (fs.existsSync(rootIndex)) return rootIndex;
  }

  return null;
}

const server = http.createServer((req, res) => {
  const filePath = findFile(req.url);

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${req.url}`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Support range requests for video streaming (.mp4)
  if (ext === '.mp4') {
    const stat = fs.statSync(filePath);
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      file.pipe(res);
      return;
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  });

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🌿 KANVA TEMPLATE LOCAL SERVER ACTIVE`);
  console.log(`  🔗 Local URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
