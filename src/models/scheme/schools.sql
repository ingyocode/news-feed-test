CREATE TABLE schools(
  id SERIAL PRIMARY KEY,
  admins_id _VARCHAR(36) NOT NULL,
  region VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  is_deleted BOOL NOT NULL default false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);