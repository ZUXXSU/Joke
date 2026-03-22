const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initialJokes = [
  {
    setup: "Why did the programmer quit his job?",
    punchline: "Because he didn't get arrays."
  },
  {
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None, that's a hardware problem."
  },
  {
    setup: "Why do programmers always mix up Halloween and Christmas?",
    punchline: "Because Oct 31 == Dec 25."
  },
  {
    setup: "What's the best thing about a Boolean?",
    punchline: "Even if you're wrong, you're only off by a bit."
  },
  {
    setup: "Why did the developer go broke?",
    punchline: "Because he used up all his cache."
  },
  {
    setup: "A SQL query walks into a bar, walks up to two tables, and asks...",
    punchline: "Can I join you?"
  },
  {
    setup: "What is a programmer's favorite hangout place?",
    punchline: "The Foo Bar."
  },
  {
    setup: "What do you call a programmer from Finland?",
    punchline: "Nerdic."
  },
  {
    setup: "Why do Java developers wear glasses?",
    punchline: "Because they don't C#."
  },
  {
    setup: "Why was the mobile phone wearing glasses?",
    punchline: "Because it lost its contacts."
  }
];

// Initialize database
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jokes (
        id SERIAL PRIMARY KEY,
        setup TEXT NOT NULL,
        punchline TEXT NOT NULL
      )
    `);

    const { rows } = await pool.query('SELECT COUNT(*) FROM jokes');
    if (parseInt(rows[0].count) === 0) {
      console.log('Seeding database with initial jokes...');
      for (const joke of initialJokes) {
        await pool.query('INSERT INTO jokes (setup, punchline) VALUES ($1, $2)', [joke.setup, joke.punchline]);
      }
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

initDB();

app.get('/api/joke', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT setup, punchline FROM jokes ORDER BY RANDOM() LIMIT 1');
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'No jokes found' });
    }
  } catch (err) {
    console.error('Error fetching joke:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
