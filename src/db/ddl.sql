-- todo_list.task
	CREATE TABLE IF NOT EXISTS todo_list.`task` (
		`task_id` BIGINT NOT NULL AUTO_INCREMENT,
		`task_name` VARCHAR(100) NOT NULL,
		`task_description` VARCHAR(255) NOT NULL,
		`task_author` VARCHAR(36) NOT NULL,
		`task_categori` ENUM('WORK','STUDY','PERSONAL') NOT NULL COMMENT "NOT MORE RELATIONSHIP WITH CATEGORI ENTITY",
		`task_tag` ENUM('URGENT','IMPORTANT','OPTIONAL') NOT NULL COMMENT "ADD TAG ENTITY RELATIONSHIP ON BACKLOG",
		`task_created_at` DATETIME(3) NOT NULL COMMENT "ADD DATE TYPE ON BACKLOG",
		`task_update_at` DATETIME(3) COMMENT "ADD DATE TYPE ON BACKLOG",
		`task_is_done` TINYINT(1) NOT NULL,
		PRIMARY KEY (`task_id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

	--todo_list.task_log
	CREATE TABLE IF NOT EXISTS todo_list.`task_log` (
  task_log_id INT AUTO_INCREMENT,
  task_log_action VARCHAR(20) NOT NULL,  -- e.g., 'INSERT', 'UPDATE', 'DELETE'
  task_log_field_name VARCHAR(255) NOT NULL,  -- Name of the field that was changed
  task_log_old_value JSON,  -- Old value can be nullable if action is 'INSERT'
  task_log_new_value JSON,  -- New value can be nullable if action is 'DELETE'
  task_log_change_date DATETIME DEFAULT CURRENT_TIMESTAMP
  -- task_log_changed_by INT,  -- ID of the user who made the change, nullable for system actions
	PRIMARY KEY (`task_log_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;