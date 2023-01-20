CREATE VIEW vw_auth_key AS
SELECT 
    users.id AS dev_id,
    users.email_address,
    api_keys.api_key,
    user_roles.id AS role_id
FROM users 
    INNER JOIN api_keys ON users.id = api_keys.user_id
    INNER JOIN user_roles ON users.user_role_id = user_roles.id;
