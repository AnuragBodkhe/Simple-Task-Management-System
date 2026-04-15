# Enhanced Task Management System

A professional, feature-rich task management system built with Node.js, Express, and modern web technologies. This system demonstrates advanced functionality including categories, tags, comprehensive filtering, and a beautiful responsive UI.

## ✨ Features

### Core Functionality
- **Task Management**: Complete CRUD operations for tasks
- **Priority Levels**: Low, Medium, High priority with visual indicators
- **Status Tracking**: Pending, In-Progress, Completed status
- **Due Date Management**: Set and track task deadlines

### Advanced Features
- **Categories & Tags**: Organize tasks with color-coded categories and flexible tagging system
- **Advanced Filtering**: Multi-criteria filtering by status, priority, category, tags, and date ranges
- **Search Functionality**: Full-text search across task titles and descriptions
- **Sorting Options**: Sort by creation date, due date, priority, or title
- **Statistics Dashboard**: Comprehensive analytics with priority distribution and category breakdown
- **Recent Activity**: Track latest task updates and changes

### UI/UX Features
- **Professional Design**: Modern, clean interface with Bootstrap 5
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, tooltips, and smooth transitions
- **Progress Visualization**: Visual progress bars for task completion status
- **Color-Coded System**: Intuitive color coding for priorities and categories

## 🛠 Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **EJS**: Embedded JavaScript templating
- **SQLite**: Local database (for development)
- **MySQL**: Production database support
- **Express Session**: Session management

### Frontend
- **Bootstrap 5**: CSS framework for responsive design
- **Bootstrap Icons**: Professional icon library
- **Custom CSS**: Enhanced styling and animations

### Database
- **SQLite**: Development database (included)
- **MySQL**: Production database (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnuragBodkhe/Simple-Task-Management-System.git
   cd Simple-Task-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Development Mode
For development with auto-reload:
```bash
npm run dev
```

## 📁 Project Structure

```
Simple-Task-Management-System/
├── config/
│   ├── database.js          # MySQL database configuration
│   └── database-sqlite.js   # SQLite database configuration
├── routes/
│   └── tasks.js             # Task management routes
├── views/
│   ├── layout.ejs           # Main layout template
│   └── tasks/
│       ├── index.ejs        # Task listing with filters
│       ├── new.ejs          # New task form
│       └── show.ejs         # Task details view
├── public/                  # Static assets
├── app.js                   # Main application file
├── database.sql             # MySQL database schema
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables
└── .gitignore               # Git ignore file
```

## 🗄 Database Setup

### SQLite (Default - No Setup Required)
The application automatically uses SQLite for local development. No additional setup needed!

### MySQL (Optional for Production)
1. Create a MySQL database
2. Update `.env` file with your database credentials
3. Run the SQL script:
   ```bash
   mysql -u username -p database_name < database.sql
   ```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks with filtering and sorting |
| GET | `/tasks/new` | Display new task creation form |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/:id` | Display task details |
| POST | `/tasks/:id` | Update existing task |
| POST | `/tasks/:id/delete` | Delete a task |

### Query Parameters for Filtering
- `search` - Search in title and description
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `category` - Filter by category ID
- `tag` - Filter by tag name
- `due_from` - Filter tasks due after this date
- `due_to` - Filter tasks due before this date
- `sort_by` - Sort field (created_at, due_date, priority, title)
- `sort_order` - Sort direction (ASC, DESC)

## 🎨 Features Showcase

### Advanced Filtering System
- Multi-criteria filtering with real-time results
- Category and tag-based organization
- Date range filtering for deadline management
- Persistent filter state across sessions

### Statistics Dashboard
- Task distribution by priority levels
- Category-based task breakdown
- Recent activity tracking
- Visual progress indicators

### Professional UI Elements
- Gradient navigation bar with smooth transitions
- Card-based layout with hover effects
- Color-coded priority indicators
- Interactive tooltips and modals
- Responsive grid system

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=3306
SESSION_SECRET=your_session_secret
```

## 🌟 Highlights

- **Zero Configuration**: Works out of the box with SQLite
- **Professional Design**: Modern, production-ready UI
- **Advanced Features**: Categories, tags, filtering, search
- **Responsive Design**: Perfect on all devices
- **Clean Code**: Well-structured, maintainable codebase
- **Comprehensive Testing**: Full functionality coverage

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue on the GitHub repository.

---

**Built with ❤️ using Node.js, Express, and modern web technologies**
