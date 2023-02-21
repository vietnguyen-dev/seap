DROP VIEW IF EXISTS vw_sellers;
CREATE VIEW vw_sellers AS 
SELECT *
FROM sellers
WHERE date_deleted 
    IS NULL
ORDER BY 
    id ASC;