CREATE VIEW vw_leads AS 
SELECT *
FROM leads
WHERE date_deleted 
    IS NULL;