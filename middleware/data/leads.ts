import pool from "../../connect"
import { Request, Response, NextFunction } from 'express';

import ileads from "../../interfaces/ileads";

const test = { 
    "address1": "9999 NE 40th place",
    "address2": null,
    "city": "Portland", 
    "state": "OR", 
    "zip": 98682,
    "addressFull": "9999 NE 40th place Portland Or 98682", 
    "fullName": "Kill Monger", 
    "phoneNumber": "(322) 234-3434", 
    "email": "killmonger@wakanda.org",
    "reason": "The water mexicans attacked", 
    "timeFrame": "asap",
    "price": null
}


export const getLeads = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query("SELECT * FROM vw_leads ORDER BY id ASC LIMIT 10;");
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err, 'from getLeads')
        res.sendStatus(500);
    }
}

export const postLeads = async (req: Request, res: Response) => {
    try {
        const { address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price } = req.body;
        const valuesArr = [ address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price ]
        const query = 
            `INSERT INTO leads 
                (address_1, address_2, city, us_state, zip_code, address_full, full_name, phone_number, email, reason, time_frame, price, date_created)
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) 
            RETURNING *`;
        const newLeads = await pool.query(query, valuesArr);
        res.status(201).send(newLeads.rows);
    }
    catch (err) {
        console.error(err, 'from postLeads')
        res.sendStatus(500);
    }
}

export const preventExistingLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { addressFull } = req.body;
        const query = 'SELECT * FROM vw_leads WHERE address_full = $1 ORDER BY id ASC;'
        const { rows } = await pool.query(query, [ addressFull])
        if (rows.length === 0) {
            next()
        }
        else {
            res.status(400).send('Address already exists')
        }

    }
    catch (err) {
        console.error(err, 'from preventExistingLead')
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
        res.status(200).send(rows);
    }
    catch (err) {

        console.error(err, req.body, 'from putLeads')
        res.sendStatus(500);
    }
}

export const deleteSingleLead = async (req: Request, res: Response)=> {
    try {
        const { id } = req.params;
        const query = 
            `UPDATE leads
            SET 
                date_deleted = NOW() 
            WHERE 
                id = $1 
            RETURNING *`
        const deletedLead = await pool.query(query, [ id ]);
        res.status(200).json(deletedLead.rows);
    }
    catch (err) {
        console.error(err, 'from deleteLeads')
        res.sendStatus(500);
    }
}


export const deleteMultipleLeads = async (req: Request, res: Response)=> {
    try {
        //deleted should be array of all leads to be sold / deleted
        const { deleted } = req.body;
        const idArr = deleted.map((lead: ileads) => lead.id)
        console.log(idArr)
        let query = 'UPDATE leads SET date_deleted = NOW() WHERE id IN ('
        for (let i = 0; i < idArr.length; i++) {
            if (i < idArr.length - 1) {
                query += `$${i + 1},`

            }
            else {
                query += `$${i + 1}`
            }
        }
        query += ');'
        console.log(query)
        const deletedLead = await pool.query(query, idArr);
        res.status(200).json(deletedLead.rows);
    }
    catch (err) {
        console.error(err, 'from deleteLeads')
        res.sendStatus(500);
    }
}
