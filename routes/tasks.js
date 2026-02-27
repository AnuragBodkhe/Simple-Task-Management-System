const express = require('express');
const router = express.Router();
const db = require('../config/database-sqlite');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        let query = `
            SELECT t.*, c.name as category_name, c.color as category_color,
                   GROUP_CONCAT(tg.name) as tags
            FROM tasks t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN task_tags tt ON t.id = tt.task_id
            LEFT JOIN tags tg ON tt.tag_id = tg.id
        `;
        const params = [];
        const whereConditions = [];

        // Filter by status
        if (req.query.status) {
            whereConditions.push('t.status = ?');
            params.push(req.query.status);
        }

        // Filter by priority
        if (req.query.priority) {
            whereConditions.push('t.priority = ?');
            params.push(req.query.priority);
        }

        // Filter by category
        if (req.query.category) {
            whereConditions.push('t.category_id = ?');
            params.push(req.query.category);
        }

        // Filter by tag
        if (req.query.tag) {
            whereConditions.push('tg.name = ?');
            params.push(req.query.tag);
        }

        // Search by title or description
        if (req.query.search) {
            whereConditions.push('(t.title LIKE ? OR t.description LIKE ?)');
            params.push(`%${req.query.search}%`, `%${req.query.search}%`);
        }

        // Filter by due date range
        if (req.query.due_from) {
            whereConditions.push('t.due_date >= ?');
            params.push(req.query.due_from);
        }

        if (req.query.due_to) {
            whereConditions.push('t.due_date <= ?');
            params.push(req.query.due_to);
        }

        // Add WHERE clause if conditions exist
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }

        // Add grouping and ordering
        query += ' GROUP BY t.id';
        
        const sortBy = req.query.sort_by || 't.created_at';
        const sortOrder = req.query.sort_order || 'DESC';
        query += ` ORDER BY ${sortBy} ${sortOrder}`;

        const [tasks] = await db.execute(query, params);
        
        // Get categories and tags for filters
        const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
        const [tags] = await db.execute('SELECT * FROM tags ORDER BY name');
        
        res.render('tasks/index', { 
            tasks,
            categories,
            tags,
            path: req.path,
            filters: req.query
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: error.message });
    }
});

// Create task form
router.get('/new', async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
        const [tags] = await db.execute('SELECT * FROM tags ORDER BY name');
        res.render('tasks/new', {
            categories,
            tags,
            formData: {}, // Initialize empty formData object
            path: req.path
        });
    } catch (error) {
        console.error('Error loading form data:', error);
        res.status(500).render('tasks/new', {
            error: 'Failed to load form data',
            formData: {}, // Initialize empty formData object
            categories: [],
            tags: [],
            path: req.path
        });
    }
});

// Create task
router.post('/', async (req, res) => {
    const { title, description, due_date, priority, category_id, tags } = req.body;
    
    // Validate required fields
    if (!title || title.trim() === '') {
        try {
            const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
            const [tagList] = await db.execute('SELECT * FROM tags ORDER BY name');
            return res.status(400).render('tasks/new', {
                error: 'Title is required',
                formData: req.body,
                categories,
                tags: tagList,
                path: req.path
            });
        } catch (formError) {
            return res.status(500).render('tasks/new', {
                error: 'Failed to load form data',
                formData: req.body,
                categories: [],
                tags: [],
                path: req.path
            });
        }
    }

    try {
        // Insert task
        const [result] = await db.execute(
            'INSERT INTO tasks (title, description, due_date, priority, category_id, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                title.trim(),
                description ? description.trim() : null,
                due_date || null,
                priority || 'medium',
                category_id || null,
                'pending',
                new Date().toISOString()
            ]
        );
        
        const taskId = result[0].id;
        
        // Handle tags if provided
        if (tags && typeof tags === 'string') {
            // Split comma-separated tags into array and trim whitespace
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            
            for (const tagName of tagArray) {
                if (tagName.trim()) {
                    // Check if tag exists, if not create it
                    const [existingTag] = await db.execute('SELECT id FROM tags WHERE name = ?', [tagName.trim()]);
                    let tagId;
                    
                    if (existingTag.length > 0) {
                        tagId = existingTag[0].id;
                    } else {
                        const [newTag] = await db.execute(
                            'INSERT INTO tags (name) VALUES (?)',
                            [tagName.trim()]
                        );
                        tagId = newTag[0].id;
                    }
                    
                    // Link tag to task
                    await db.execute(
                        'INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)',
                        [taskId, tagId]
                    );
                }
            }
        }
        
        // Set success message in session
        req.session.success = 'Task created successfully!';
        res.redirect('/tasks');
    } catch (error) {
        console.error('Error creating task:', error);
        
        try {
            const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
            const [tagList] = await db.execute('SELECT * FROM tags ORDER BY name');
            res.status(500).render('tasks/new', {
                error: 'Failed to create task. Please try again.',
                formData: req.body,
                categories,
                tags: tagList,
                path: req.path
            });
        } catch (formError) {
            const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
            const [tagList] = await db.execute('SELECT * FROM tags ORDER BY name');
            res.status(500).render('tasks/new', {
                error: 'Failed to create task. Please try again.',
                formData: req.body,
                categories,
                tags: tagList,
                path: req.path
            });
        }
    }
});

// Get task by id
router.get('/:id', async (req, res) => {
    try {
        const [task] = await db.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (task.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.render('tasks/show', { 
            task: task[0],
            path: req.path // Add current path to the template context
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update task
router.post('/:id', async (req, res) => {
    const { title, description, due_date, priority, status } = req.body;
    try {
        await db.execute(
            'UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ?, status = ? WHERE id = ?',
            [title, description, due_date, priority, status, req.params.id]
        );
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete task
router.post('/:id/delete', async (req, res) => {
    try {
        await db.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;