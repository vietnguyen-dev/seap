CREATE TABLE contacts (
    --need to change from big serial to int to get correct types \
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL, 
    last_name VARCHAR(64) NOT NULL, 
    phone VARCHAR(16) NOT NULL,
    email VARCHAR(128) NOT NULL,
    user_id BIGSERIAL NOT NULL,
    date_created DATE NOT NULL DEFAULT NOW(),
    date_updated DATE NULL,
    date_deleted DATE NULL,
    CONSTRAINT FK__user_id FOREIGN KEY(user_id)
        REFERENCES users(id)
);