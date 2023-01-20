CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    email_address VARCHAR(64) NOT NULL,
    pass_word VARCHAR(64) NOT NULL,
    user_role_id BIGSERIAL NOT NULL,
    date_created DATE NOT NULL,
    date_updated DATE NULL,
    date_deleted DATE NULL,
    CONSTRAINT FK_user_role_id FOREIGN KEY(user_role_id)
        REFERENCES user_roles(id)
);

