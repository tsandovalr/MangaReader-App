CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  password VARCHAR(256) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  avatar VARCHAR(200) NOT NULL,
  creation_date timestamp NOT NULL,
  rol_id INT
);

CREATE TABLE roles (
  rol_id SERIAL PRIMARY KEY,
  type_rol VARCHAR(50)
);

CREATE TABLE mangas (
  manga_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  genres VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  artist VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  manga_photo VARCHAR(300) NOT NULL,
  publisher VARCHAR(100) NOT NULL,
  copyright VARCHAR(100) NOT NULL,
  subscribe boolean,
  publication_date timestamp,
  user_id INT,
  comment_id INT,
  chapter_id INT
);

CREATE TABLE chapters (
  chapter_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  page VARCHAR(100) NOT NULL,
  manga_id INT
);

CREATE TABLE subscriptions (
  subscription_id SERIAL PRIMARY KEY,
  user_id INT,
  manga_id INT,
  chapter_id INT,
  chapter_seen INT
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  text VARCHAR(200) NOT NULL,
  date timestamp
);

ALTER TABLE users ADD FOREIGN KEY (rol_id) REFERENCES roles (rol_id);

ALTER TABLE mangas ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE mangas ADD FOREIGN KEY (comment_id) REFERENCES comments (comment_id);

ALTER TABLE mangas ADD FOREIGN KEY (chapter_id) REFERENCES chapters (chapter_id);

ALTER TABLE chapters ADD FOREIGN KEY (manga_id) REFERENCES mangas (manga_id);

ALTER TABLE subscriptions ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE subscriptions ADD FOREIGN KEY (manga_id) REFERENCES mangas (manga_id);

ALTER TABLE subscriptions ADD FOREIGN KEY (chapter_id) REFERENCES chapters (chapter_id);
