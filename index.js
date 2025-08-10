// crud.js
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// ✅ Replace with your actual Neon PostgreSQL connection string
const pool = new Pool({
  connectionString:"postgresql://neondb_owner:npg_el0DmtUZvHO2@ep-frosty-paper-aerxi47x-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

app.use(bodyParser.json());

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`, (err) => {
  if (err) console.error('Error creating table:', err);
  else console.log('✅ Users table ready');
});

app.get("/",(req,res)=>{
    res.json("hello world");
})

// ➕ Create
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📥 Read all
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Read one
app.get('/users/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

/*

MONGO_URI=mongodb+srv://niranjancse2023:niranjan2005@cluster0.tmh1gke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/