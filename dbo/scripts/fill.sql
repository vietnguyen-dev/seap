INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('17264 DE demn you', NULL, 'Portland', 'OR', 24323, '17264 DE demn you Portland OR 24323',  'Jaerry', 'Larson', '(971) 998-2695', 'poop@gmail.com', 'house burned down', 'asap', NULL );
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('98984 NE frisk you', NULL, 'Milwaukie', 'OR', 98682, '98984 NE frisk you Milwaukie OR 98682',  'Park',' Hill', '(971) 123-3233', 'park.homes@gmail.com', 'divorce', '3 months', 325000.00);
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('42333 SW jane way', NULL, 'Gresham', 'OR', 35545, '42333 SW jane way Gresham OR 35545',  'Henry', 'Danger', '(971) 432-4333', 'danger.man@hotmail.com', 'pokemon battle gone wrong', '6 months', NULL) ;
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('23423 SE Portland Land', NULL, 'Portland', 'OR', 11111, '23423 SE Portland Land Portland OR 11111',  'Ash',' Ketchum', '(971) 938-2342', 'hi@gmail.com', 'house burned down by charizard', '3 months', NULL);
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('23222 AB Poop you', NULL, 'Milwaukie', 'OR', 98682, '23222 AB Poop you Milwaukie OR 98682',  'Misty', 'Pussymagnet', '(243) 623-2362', 'bye@gmail.com', 'tree fell into kitchen', 'immediately', 255000.00 );
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('11111 AA Bane way', NULL, 'Gresham', 'OR', 34534, '11111 AA Bane way Gresham OR 34534',  'Brock', 'Cock', '(432) 323-2222', 'cock.man@hotmail.com', 'pokemon battle gone wrong', '6 months', NULL )
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('17264 DE demn you', NULL, 'Portland', 'OR', 24323, '17264 DE demn you Portland OR 24323',  'Jaerry','Larson', '(971) 998-2695', 'poop@gmail.com', 'house burned down', 'asap', NULL );
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('98984 NE frisk you', NULL, 'Milwaukie', 'OR', 98682, '98984 NE frisk you Milwaukie OR 98682',  'Park', 'Hill', '(971) 123-3233', 'park.homes@gmail.com', 'divorce', '3 months', 325000.00 );
INSERT INTO motivated_sellers (address_1, address_2, city, us_state, zip_code, address_full, first_name, last_name, phone, email, reason, time_frame, price) VALUES ('42333 SW jane way', NULL, 'Gresham', 'OR', 35545, '42333 SW jane way Gresham OR 35545',  'Henry', 'Danger', '(971) 432-4333', 'danger.man@hotmail.com', 'pokemon battle gone wrong', '6 months', NULL);



INSERT INTO developer_roles (code, developer_role) VALUES ('ADM', 'Admin');
INSERT INTO developer_roles (code, developer_role) VALUES ('DEV', 'Developer');
INSERT INTO developer_roles (code, developer_role) VALUES ('EXT', 'External');


UPDATE motivated_sellers SET date_deleted = NOW() WHERE id BETWEEN 3 AND 6;

SELECT * FROM motivated_sellers WHERE id BETWEEN 3 AND 6;