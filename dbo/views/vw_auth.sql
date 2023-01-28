DROP VIEW IF EXISTS vw_auth;

CREATE VIEW vw_auth AS
SELECT 
    d.id AS developer_id,
    d.email,
    api_keys.api_key,
    developer_roles.id AS role_id
FROM developers AS d
    INNER JOIN api_keys ON d.id = api_keys.developer_id
    INNER JOIN developer_roles ON d.developer_role_id = developer_roles.id
ORDER BY 
    d.id ASC;
