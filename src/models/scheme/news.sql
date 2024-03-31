CREATE TABLE news(
  id SERIAL PRIMARY KEY,
  school_id INT NOT NULL,
  writer_id VARCHAR(36) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(500) NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);