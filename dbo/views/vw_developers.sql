DROP VIEW IF EXISTS vw_developers;

CREATE VIEW vw_developers AS 
SELECT *
FROM developers
WHERE date_deleted 
    IS NULL
ORDER BY
    id ASC;