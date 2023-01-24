CREATE VIEW vw_motivated_sellers AS 
SELECT *
FROM motivated_sellers
WHERE date_deleted 
    IS NULL;