const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const [tasks] = await db.execute('SELECT * FROM tasks ORDER BY created_at DESC');
        res.render('tasks/index', { 
            tasks,
            path: req.path // Add current path to the template context
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create task form
router.get('/new', (req, res) => {
    res.render('tasks/new', {
        path: req.path // Add current path to the template context
    });
});

// Create task
router.post('/', async (req, res) => {
    const { title, description, due_date, priority } = req.body;
    
    // Validate required fields
    if (!title || title.trim() === '') {
        return res.status(400).render('tasks/new', {
            error: 'Title is required',
            formData: req.body
        });
    }

    try {
        // Set default values for optional fields
        const taskData = {
            title: title.trim(),
            description: description ? description.trim() : null,
            due_date: due_date || null,
            priority: priority || 'medium',
            status: 'pending',  // Default status
            updated_at: new Date()
        };

        await db.execute(
            'INSERT INTO tasks (title, description, due_date, priority, status, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [
                taskData.title,
                taskData.description,
                taskData.due_date,
                taskData.priority,
                taskData.status,
                taskData.updated_at
            ]
        );
        
        // Set success message in session
        req.session.success = 'Task created successfully!';
        res.redirect('/tasks');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).render('tasks/new', {
            error: 'Failed to create task. Please try again.',
            formData: req.body
        });
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