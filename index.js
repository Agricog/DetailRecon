const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Normalize URL (remove query strings)
  let url = req.url.split('?')[0];
  
  // Map routes to files
  let filePath;
  if (url === '/' || url === '') {
    filePath = path.join(__dirname, 'index.html');
  } else if (url === '/privacy') {
    filePath = path.join(__dirname, 'privacy.html');
  } else if (url === '/terms') {
    filePath = path.join(__dirname, 'terms.html');
  } else {
    filePath = path.join(__dirname, url);
  }
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

