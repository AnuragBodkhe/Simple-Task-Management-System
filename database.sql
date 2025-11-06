-- ================================
-- Task Management Database (Works on Old MySQL)
-- ================================

-- Use your existing database
USE `sql12806421`;

-- Drop table if it already exists
DROP TABLE IF EXISTS `tasks`;

-- Create tasks table (fully compatible)
CREATE TABLE `tasks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `status` ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
    `due_date` DATE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Sample Records (optional)
INSERT INTO `tasks` (`title`, `description`, `priority`, `due_date`, `updated_at`)
VALUES
('Finish Report', 'Complete project documentation', 'high', '2025-11-10', NOW()),
('Team Meeting', 'Weekly sync with team', 'medium', '2025-11-08', NOW()),
('Code Review', 'Review pull request #142', 'low', '2025-11-09', NOW());
