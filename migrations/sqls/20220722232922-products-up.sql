
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  description text ,
  price decimal(10,2) NOT NULL,
  category varchar(50),
  created_at date DEFAULT CURRENT_TIMESTAMP,
  updated_at date DEFAULT CURRENT_TIMESTAMP
);