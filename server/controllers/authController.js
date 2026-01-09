import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../server.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-this';

export const register = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    db.run(sql, [username, email, hashedPassword], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
            return res.status(500).json({ error: err.message });
        }

        // Auto login after register
        const token = jwt.sign({ id: this.lastID, username }, SECRET_KEY, { expiresIn: '24h' });
        console.log(`[AUTH] User Registered & Logged In: ${username} (${email})`);
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: this.lastID, username, email }
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });

        console.log(`[AUTH] User Logged In: ${user.username} (${user.email})`);

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    });
};

export const getMe = (req, res) => {
    // Middleware should attach user to req
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    db.get("SELECT id, username, email FROM users WHERE id = ?", [userId], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    });
}
