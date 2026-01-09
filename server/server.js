import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const envPath = join(dirname(fileURLToPath(import.meta.url)), '../.env');
console.log('Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
    console.log('Error loading .env:', result.error);
} else {
    console.log('.env loaded successfully');
    console.log('OPENAI_API_KEY present:', !!process.env.OPENAI_API_KEY);
    console.log('VITE_OPENAI_API_KEY present:', !!process.env.VITE_OPENAI_API_KEY);
}

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
import authRoutes from './routes/authRoutes.js';
import openaiRoutes from './routes/openaiRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/openai', openaiRoutes);
app.use('/api/history', historyRoutes);

// Database Setup
const dbPath = join(dirname(fileURLToPath(import.meta.url)), 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

// Initialize Database Tables
function initDb() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS generations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    prompt TEXT,
    content TEXT,
    framework TEXT,
    thumbnail TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
}

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { db };
