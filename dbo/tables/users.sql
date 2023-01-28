CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(64) NOT NULL UNIQUE,
    pass_word VARCHAR(64) NOT NULL,
    date_created DATE NOT NULL DEFAULT NOW(),
    date_updated DATE NULL,
    date_deleted DATE NULL,
);   
