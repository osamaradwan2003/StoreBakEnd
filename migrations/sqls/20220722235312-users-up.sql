

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  frist_name varchar(25) ,
  last_name varchar(25),
  email varchar(100) ,
  password varchar(255),
  created_at date DEFAULT CURRENT_TIMESTAMP,
  updated_at date DEFAULT CURRENT_TIMESTAMP
);