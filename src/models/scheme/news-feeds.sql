CREATE TABLE news_feeds(
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(36) NOT NULL,
  news_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX news_feeds_user_id_idx on news_feeds(user_id);
