const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  let filePath;
  
  if (url === '/' || url === '') {
    filePath = path.join(__dirname, 'index.html');
  } else if (url === '/privacy') {
    filePath = path.join(__dirname, 'privacy.html');
  } else if (url === '/terms') {
    filePath = path.join(__dirname, 'terms.html');
  } else if (url === '/demo') {
    filePath = path.join(__dirname, 'demo.html');
  } else if (url === '/sample-report.pdf') {
    filePath = path.join(__dirname, 'DetailRecon_Demo_Report.pdf');
  } else if (url === '/sitemap.xml') {
    filePath = path.join(__dirname, 'public', 'sitemap.xml');
  } else if (url === '/robots.txt') {
    filePath = path.join(__dirname, 'robots.txt');
  } else {
    filePath = path.join(__dirname, 'public', url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(__dirname, url);
    }
  }
  
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const isBinary = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.ico'].includes(ext);
  
  fs.readFile(filePath, isBinary ? null : 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return;
    }
    
    const headers = { 'Content-Type': contentType };
    if (ext === '.pdf') {
      headers['Content-Disposition'] = 'attachment; filename="DetailRecon_Sample_Report.pdf"';
      headers['Content-Length'] = data.length;
    }
    
    res.writeHead(200, headers);
    res.end(data);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

