const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve the apple-app-site-association file with the correct content type
  server.get('/.well-known/apple-app-site-association', (req, res) => {
    const filePath = path.join(__dirname, 'public', '.well-known', 'apple-app-site-association');
    res.setHeader('Content-Type', 'application/json');
    fs.createReadStream(filePath).pipe(res);
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});