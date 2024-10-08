// // This is an example of a server.js file for a Next.js project
// const next = require('next')
// const http = require('http')

// // Check if the environment is development or production
// const dev = process.env.NODE_ENV !== 'production'

// // Create a Next.js app instance
// const app = next({ dev })

// // Get the request handler from the app instance
// const handle = app.getRequestHandler()

// // Create a server with the request handler
// const server = http.createServer((req, res) => {
//     handle(req, res)
// })

// // Start the server on a specific port
// const port = process.env.PORT || 3000
// server.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// })

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

