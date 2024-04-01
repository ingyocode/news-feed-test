CREATE TABLE schools(
  id SERIAL PRIMARY KEY,
  admin_id VARCHAR(36) NOT NULL,
  region VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  is_deleted BOOL NOT NULL default false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (region, name)
);
CREATE INDEX schools_admins_id_idx on schools(admins_id);
CREATE INDEX schools_is_deleted_idx on schools(is_deleted);