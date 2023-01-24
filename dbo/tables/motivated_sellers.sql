CREATE TABLE motivated_sellers (
    id BIGSERIAL PRIMARY KEY,
    address_1 VARCHAR(64) NOT NULL,
    address_2 VARCHAR(64) NULL,
    city VARCHAR(32) NOT NULL,
    us_state VARCHAR(2) NOT NULL,
    zip_code INT NOT NULL,
    address_full VARCHAR(256) NOT NULL,
    first_name VARCHAR(64) NOT NULL, 
    last_name VARCHAR(64) NOT NULL, 
    phone VARCHAR(16) NOT NULL,
    email VARCHAR(128) NOT NULL,
    reason VARCHAR(128) NOT NULL,
    time_frame VARCHAR(64) NOT NULL,
    price DECIMAL(12,2) NULL,
    date_created DATE NOT NULL DEFAULT NOW(),
    date_updated DATE NULL,
    date_deleted DATE NULL
);