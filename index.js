const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// GET
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GET!' });
});

// POST
app.post('/api/hello', (req, res) => {
  res.json({ message: 'Hello from POST!', data: req.body });
});

// PUT
app.put('/api/hello', (req, res) => {
  res.json({ message: 'Hello from PUT!', data: req.body });
});

// DELETE
app.delete('/api/hello', (req, res) => {
  res.json({ message: 'Hello from DELETE!' });
});



// Export the app as a Vercel serverless function
module.exports = app;
