require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Database connection
const db = require('./config/database');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/tasks');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});