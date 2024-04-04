CREATE TABLE admins(
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  salt VARCHAR(200) NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX students_email_idx on students(email);
CREATE INDEX students_is_deleted_idx on students(is_deleted);