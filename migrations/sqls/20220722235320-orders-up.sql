--POSTGRESS CREATE ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  product_id integer NOT NULL,
  quantity integer NOT NULL,
  status varchar(10) NOT NULL DEFAULT 'pending', -- pending, processing, completed, canceled
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);