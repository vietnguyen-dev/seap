CREATE TABLE leads (
    id BIGSERIAL NOT NULL,
    full_name TEXT NOT NULL, 
    phone_number INT NOT NULL,
    email TEXT NOT NULL,
    reason TEXT NOT NULL,
    time_frame TEXT NOT NULL,
    price MONEY NULL,
    date_created DATE NOT NULL,
    date_deleted DATE NULL
);