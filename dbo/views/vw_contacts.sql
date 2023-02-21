DROP VIEW IF EXISTS vw_contacts;

CREATE VIEW vw_contacts AS 
SELECT *
FROM contacts
WHERE date_deleted 
    IS NULL
ORDER BY
    id ASC;