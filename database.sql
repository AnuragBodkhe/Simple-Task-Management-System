-- ================================
-- Task Management Database (Works on Old MySQL)
-- ================================

-- Use your existing database
USE `sql12806421`;

-- Drop tables if they already exist
DROP TABLE IF EXISTS `task_tags`;
DROP TABLE IF EXISTS `tags`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `tasks`;

-- Create categories table
CREATE TABLE `categories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `color` VARCHAR(7) DEFAULT '#007bff',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create tags table
CREATE TABLE `tags` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `color` VARCHAR(7) DEFAULT '#6c757d',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create tasks table (fully compatible)
CREATE TABLE `tasks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `status` ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
    `due_date` DATE,
    `category_id` INT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create task_tags junction table for many-to-many relationship
CREATE TABLE `task_tags` (
    `task_id` INT NOT NULL,
    `tag_id` INT NOT NULL,
    PRIMARY KEY (`task_id`, `tag_id`),
    FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Sample Categories
INSERT INTO `categories` (`name`, `color`) VALUES
('Work', '#007bff'),
('Personal', '#28a745'),
('Shopping', '#ffc107'),
('Health', '#dc3545'),
('Learning', '#6610f2');

-- Sample Tags
INSERT INTO `tags` (`name`, `color`) VALUES
('urgent', '#dc3545'),
('important', '#fd7e14'),
('meeting', '#20c997'),
('project', '#6f42c1'),
('deadline', '#e83e8c'),
('review', '#17a2b8');

-- Sample Records (optional)
INSERT INTO `tasks` (`title`, `description`, `priority`, `due_date`, `category_id`, `updated_at`)
VALUES
('Finish Report', 'Complete project documentation', 'high', '2025-11-10', 1, NOW()),
('Team Meeting', 'Weekly sync with team', 'medium', '2025-11-08', 1, NOW()),
('Code Review', 'Review pull request #142', 'low', '2025-11-09', 1, NOW()),
('Buy Groceries', 'Get items for the week', 'medium', '2025-11-07', 3, NOW()),
('Doctor Appointment', 'Annual health checkup', 'high', '2025-11-15', 4, NOW());

-- Link some tags to tasks
INSERT INTO `task_tags` (`task_id`, `tag_id`) VALUES
(1, 1), (1, 2), (1, 5),
(2, 3), (2, 4),
(3, 6),
(4, 2),
(5, 1), (5, 5);
