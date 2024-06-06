--------------------------------------------------------------------------------
-- ROLES
--------------------------------------------------------------------------------
DO
$do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'admin_qdmedia'
      ) THEN

      RAISE NOTICE 'Role "admin_qdmedia" already exists. Skipping.';
   ELSE
      CREATE ROLE admin_qdmedia LOGIN PASSWORD '1931a38f-62b6-49f4-8d07-5d020a9eb104';
   END IF;
END
$do$;

--------------------------------------------------------------------------------
-- DATABASE
--------------------------------------------------------------------------------
CREATE DATABASE qdmedia_db;
GRANT ALL PRIVILEGES ON DATABASE qdmedia_db TO admin_qdmedia;
\c qdmedia_db

--------------------------------------------------------------------------------
-- TABLES
--------------------------------------------------------------------------------
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL UNIQUE,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_type INTEGER,
    last_login TIMESTAMP NOT NULL,
    user_passw VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP
);

CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id),
    title VARCHAR(255),
    post_description VARCHAR(1000),
    views INT,
    likes INT,
    dislikes INT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Comments (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES Users(id),
   post_id INT REFERENCES Posts(id),
   comment_description VARCHAR(1000),
   comment_status VARCHAR(50),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP 
);

--------------------------------------------------------------------------------
-- POPULATING TABLES
--------------------------------------------------------------------------------
INSERT INTO Users (user_name, user_email, user_type, last_login, user_passw)
VALUES 
('John Doe', 'john.doe@example.com', 1, '2024-04-28 14:30:00', 'password123'),
('Jane Smith', 'jane.smith@example.com', 2, '2024-04-29 10:00:00', 'password123'),
('Alice Jones', 'alice.jones@example.com', 1, '2024-04-29 11:15:00', 'password123'),
('Bob Brown', 'bob.brown@example.com', 2, '2024-04-30 09:45:00', 'password123');

INSERT INTO Posts (user_id, title, post_description, views, likes, dislikes, image_url)
VALUES 
(1, 'First Post', 'This is the description of the first post.', 150, 10, 2, 'http://example.com/image1.jpg'),
(2, 'Second Post', 'This is the description of the second post.', 200, 20, 3, 'http://example.com/image2.jpg'),
(3, 'Third Post', 'This is the description of the third post.', 250, 25, 5, 'http://example.com/image3.jpg'),
(1, 'Fourth Post', 'This is the description of the fourth post.', 300, 30, 7, 'http://example.com/image4.jpg');

INSERT INTO Comments (user_id, post_id, comment_description, comment_status)
VALUES 
(1, 1, 'This is the first comment on the first post.', 'ok'),
(2, 1, 'This is the second comment on the first post.', 'ok'),
(3, 2, 'This is the first comment on the second post.', 'removed_by_user'),
(1, 3, 'This is the first comment on the third post.', 'ok'),
(4, 4, 'This is the first comment on the fourth post.', 'ok');
