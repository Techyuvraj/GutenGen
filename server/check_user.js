import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const dbPath = join(dirname(fileURLToPath(import.meta.url)), 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const email = 'yuvrajs@whitelabeliq.com';

db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('--- ALL USERS ---');
    console.log(rows);

    const user = rows.find(r => r.email === email);
    if (user) {
        console.log('\nFOUND USER:', user);
    } else {
        console.log('\nUSER NOT FOUND:', email);
    }
});
