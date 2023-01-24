CREATE TABLE api_keys (
    id BIGSERIAL PRIMARY KEY,
    api_key VARCHAR(64) NOT NULL,
    developer_id BIGSERIAL NOT NULL,
    CONSTRAINT FK_user_id FOREIGN KEY(developer_id)
        REFERENCES developers(id)
);
