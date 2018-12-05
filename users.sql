CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE CHECK (email <> ''),
    password VARCHAR(200) NOT NULL,
    profilepic TEXT,
    bio TEXT
);
