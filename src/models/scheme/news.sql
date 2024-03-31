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
CREATE INDEX news_school_id_idx on news(school_id);
CREATE INDEX news_writer_id_idx on news(writer_id);
CREATE INDEX news_is_deleted_idx on news(is_deleted);