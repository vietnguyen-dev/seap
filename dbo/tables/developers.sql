CREATE TABLE developers (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    pass_word VARCHAR(64) NOT NULL,
    developer_role_id BIGSERIAL NOT NULL,
    date_created DATE NOT NULL DEFAULT NOW(),
    date_updated DATE NULL,
    date_deleted DATE NULL,
    CONSTRAINT FK_developer_role_id FOREIGN KEY(developer_role_id)
        REFERENCES developer_roles(id)
);

