import pool from "../connect"
import { Request, Response, NextFunction } from 'express';

export const getLeads = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query("SELECT * FROM leads ORDER BY id ASC;");
        res.send(rows);
    }
    catch (err) {
        console.log(process.env)
        console.error(err, 'from getLeads')
        res.sendStatus(500);
    }
}

export const postLeads = async (req: Request, res: Response) => {
    try {
        const { address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price, dateCreated } = req.body;
        const valuesArr = [ address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price, dateCreated ]
        const query = 
            `INSERT INTO leads 
                (address_1, address_2, city, us_state, zip_code, address_full, full_name, phone_number, email, reason, time_frame, price, date_created)
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
            RETURNING *`;
        const newLeads = await pool.query(query, valuesArr);
        res.json(newLeads.rows);
    }
    catch (err) {
        console.error(err, 'from postLeads')
        res.sendStatus(500);
    }
}

export const putLeads = async (req: Request, res: Response) => {
    try {
        const { id, address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price } = req.body;
        const valuesArr = [ id, address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price ]
        const query = 
            `UPDATE leads 
            SET 
                address_1 = $2, 
                address_2 = $3,
                city = $4,
                us_state = $5,
                zip_code = $6,
                address_full = $7,
                full_name = $8, 
                phone_number = $9, 
                email = $10, 
                reason = $11, 
                time_frame = $12,
                price = $13,
                date_updated = NOW()
            WHERE id = $1 
            RETURNING *`
        await pool.query(query, valuesArr);
        const { rows } = await pool.query("SELECT * FROM leads ORDER BY id ASC;");
        res.send(rows);
    }
    catch (err) {

        console.error(err, req.body, 'from putLeads')
        res.sendStatus(500);
    }
}

export const deleteLeads = async (req: Request, res: Response)=> {
    try {
        const { id } = req.query;
        const query = `DELETE FROM leads WHERE id = $1 RETURNING *`
        const deletedLead = await pool.query(query, [ id ]);
        res.json(deletedLead.rows);
    }
    catch (err) {
        console.error(err, 'from deleteLeads')
        res.sendStatus(500);
    }
}


