import { db } from '../server.js';

export const getUserHistory = (req, res) => {
    const userId = req.userId;

    const sql = `SELECT * FROM generations WHERE user_id = ? ORDER BY created_at DESC`;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const deleteGeneration = (req, res) => {
    const userId = req.userId;
    const { id } = req.params;

    const sql = `DELETE FROM generations WHERE id = ? AND user_id = ?`;

    db.run(sql, [id, userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Generation not found or unauthorized' });

        res.json({ message: 'Generation deleted successfully' });
    });
};

export const clearHistory = (req, res) => {
    const userId = req.userId;

    const sql = `DELETE FROM generations WHERE user_id = ?`;

    db.run(sql, [userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: 'History cleared successfully', count: this.changes });
    });
};
