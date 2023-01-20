CREATE TABLE api_keys (
    id BIGSERIAL PRIMARY KEY,
    api_key VARCHAR(64) NOT NULL,
    user_id BIGSERIAL NOT NULL,
    CONSTRAINT FK_user_id FOREIGN KEY(user_id)
        REFERENCES users(id)
);
