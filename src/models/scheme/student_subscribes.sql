CREATE TABLE student_subscribes(
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(36) NOT NULL,
  school_id INT NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (student_id, school_id)
);
CREATE INDEX student_subscribes_student_id_idx on student_subscribes(student_id);
CREATE INDEX student_subscribes_school_id_idx on student_subscribes(school_id);
CREATE INDEX student_subscribes_is_deleted_idx on student_subscribes(is_deleted);
