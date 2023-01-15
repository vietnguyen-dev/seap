CREATE TABLE leads (
    id BIGSERIAL PRIMARY KEY,
    address_1 VARCHAR(64) NOT NULL,
    address_2 VARCHAR(64) NULL,
    city VARCHAR(32) NOT NULL,
    us_state VARCHAR(2) NOT NULL,
    zip_code INT NOT NULL,
    address_full VARCHAR(256) NOT NULL,
    full_name VARCHAR(64) NOT NULL, 
    phone_number VARCHAR(16) NOT NULL,
    email VARCHAR(128) NOT NULL,
    reason VARCHAR(128) NOT NULL,
    time_frame VARCHAR(64) NOT NULL,
    price DECIMAL(12,2) NULL,
    date_created DATE NOT NULL,
    date_updated DATE NULL,
    date_deleted DATE NULL
);

INSERT INTO leads (address_1, address_2, city, us_state, zip_code, address_full, full_name, phone_number, email, reason, time_frame, price, date_created) VALUES ('17264 DE demn you', NULL, 'Portland', 'OR', 24323, '17264 DE demn you Portland OR 24323',  'Jaerry Larson', '(971) 998-2695', 'poop@gmail.com', 'house burned down', 'asap', NULL, NOW());
INSERT INTO leads (address_1, address_2, city, us_state, zip_code, address_full, full_name, phone_number, email, reason, time_frame, price, date_created) VALUES ('98984 NE frisk you', NULL, 'Milwaukie', 'OR', 98682, '98984 NE frisk you Milwaukie OR 98682',  'Park Hill', '(971) 123-3233', 'park.homes@gmail.com', 'divorce', '3 months', 325000.00, NOW());
INSERT INTO leads (address_1, address_2, city, us_state, zip_code, address_full, full_name, phone_number, email, reason, time_frame, price, date_created) VALUES ('42333 SW jane way', NULL, 'Gresham', 'OR', 35545, '42333 SW jane way Gresham OR 35545',  'Henry Danger', '(971) 432-4333', 'danger.man@hotmail.com', 'pokemon battle gone wrong', '6 months', NULL, NOW());
