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

INSERT INTO leads(full_name, phone_number, email, reason, time_frame, price, date_created) 
VALUES ('John Nguyen', 9712223333, 'john.nguyen@gmail.com', 'need to fix my meth addiction', 'asap', 290000, NOW());