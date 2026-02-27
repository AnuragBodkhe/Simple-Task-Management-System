const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initDatabase = () => {
    return new Promise((resolve, reject) => {
        // Enable foreign keys
        db.run('PRAGMA foreign_keys = ON');
        
        // Create categories table
        db.run(`CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL UNIQUE,
            color VARCHAR(7) DEFAULT '#007bff',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        
        // Create tags table
        db.run(`CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL UNIQUE,
            color VARCHAR(7) DEFAULT '#6c757d',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        
        // Create tasks table
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(20) DEFAULT 'pending',
            priority VARCHAR(10) DEFAULT 'medium',
            due_date DATE,
            category_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME,
            FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
        )`);
        
        // Create task_tags junction table
        db.run(`CREATE TABLE IF NOT EXISTS task_tags (
            task_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (task_id, tag_id),
            FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
        )`);
        
        // Insert sample data if tables are empty
        db.get("SELECT COUNT(*) as count FROM categories", (err, row) => {
            if (!err && row.count === 0) {
                // Insert sample categories
                db.run(`INSERT INTO categories (name, color) VALUES 
                    ('Work', '#007bff'),
                    ('Personal', '#28a745'),
                    ('Shopping', '#ffc107'),
                    ('Health', '#dc3545'),
                    ('Learning', '#6610f2')`);
                
                // Insert sample tags
                db.run(`INSERT INTO tags (name, color) VALUES 
                    ('urgent', '#dc3545'),
                    ('important', '#fd7e14'),
                    ('meeting', '#20c997'),
                    ('project', '#6f42c1'),
                    ('deadline', '#e83e8c'),
                    ('review', '#17a2b8')`);
                
                // Insert sample tasks
                db.run(`INSERT INTO tasks (title, description, priority, due_date, category_id, updated_at) VALUES 
                    ('Finish Report', 'Complete project documentation', 'high', '2025-11-10', 1, datetime('now')),
                    ('Team Meeting', 'Weekly sync with team', 'medium', '2025-11-08', 1, datetime('now')),
                    ('Code Review', 'Review pull request #142', 'low', '2025-11-09', 1, datetime('now')),
                    ('Buy Groceries', 'Get items for the week', 'medium', '2025-11-07', 3, datetime('now')),
                    ('Doctor Appointment', 'Annual health checkup', 'high', '2025-11-15', 4, datetime('now'))`);
                
                // Link tags to tasks
                db.run(`INSERT INTO task_tags (task_id, tag_id) VALUES 
                    (1, 1), (1, 2), (1, 5),
                    (2, 3), (2, 4),
                    (3, 6),
                    (4, 2),
                    (5, 1), (5, 5)`);
            }
            resolve();
        });
    });
};

// SQLite query helper functions
const execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        // Use db.run() for INSERT operations to get insertId
        if (query.trim().toUpperCase().startsWith('INSERT')) {
            db.run(query, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Return result with insertId for INSERT operations
                    resolve([{ id: this.lastID, changes: this.changes }]);
                }
            });
        } else {
            // Use db.all() for SELECT operations
            db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve([rows]);
                }
            });
        }
    });
};

// Initialize database on startup
initDatabase().catch(console.error);

module.exports = {
    execute,
    db
};
