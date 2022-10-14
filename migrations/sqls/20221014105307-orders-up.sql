CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(50),
    user_id uuid REFERENCES users(id) NOT NULL
);