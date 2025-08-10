const express = require('express');
const app = express();

// Simple GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

// Export the app as a Vercel serverless function
module.exports = app;
