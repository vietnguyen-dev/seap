CREATE VIEW vw_users AS 
SELECT *
FROM users
WHERE date_deleted 
    IS NULL
ORDER BY 
    id ASC;