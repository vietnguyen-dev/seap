import pool from "../../connect"
import { Request, Response, NextFunction } from 'express';

import isellers from "../../interfaces/isellers";

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


export const getSellers = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query("SELECT * FROM vw_sellers ORDER BY id ASC LIMIT 50;");
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err, 'from getsellers')
        res.sendStatus(500);
    }
}

export const postSeller = async (req: Request, res: Response) => {
    try {
        for (const prop in req.body) {
            if (!req.body[prop]) {
                res.status(400)
            }
          } 
        const { address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price } = req.body;
        const valuesArr = [ address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price ]
        const query = 
            `INSERT INTO sellers 
                (address_1, address_2, city, us_state, zip_code, address_full, full_name, phone_number, email, reason, time_frame, price, date_created)
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) 
            RETURNING *`;
        const newsellers = await pool.query(query, valuesArr);
        res.status(201).send(newsellers.rows);
    }
    catch (err) {
        console.error(err, 'from postsellers')
        res.status(400);
    }
}

export const preventExistingSeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { addressFull } = req.body;
        const query = 'SELECT * FROM vw_sellers WHERE address_full = $1 ORDER BY id ASC;'
        const { rows } = await pool.query(query, [ addressFull])
        if (rows.length === 0) {
            next()
        }
        else {
            res.status(400).send('Address already exists')
        }

    }
    catch (err) {
        console.error(err, 'from preventExistingseller')
        res.sendStatus(500);
    }
}

export const putSeller = async (req: Request, res: Response) => {
    try {
        for (const prop in req.body) {
            if (!req.body[prop]) {
                res.status(400)
            }
          } 
        const { id, address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price } = req.body;
        const valuesArr = [ id, address1, address2, city, state, zip, addressFull, fullName, phoneNumber, email, reason, timeFrame, price ]
        const query = 
            `UPDATE sellers 
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
        const { rows } = await pool.query("SELECT * FROM sellers ORDER BY id ASC LIMIT 50;");
        res.status(200).send(rows);
    }
    catch (err) {

        console.error(err, req.body, 'from putsellers')
        res.sendStatus(500);
    }
}

export const deleteSingleSeller = async (req: Request, res: Response)=> {
    try {
        const { id } = req.params;
        const query = 
            `UPDATE sellers
            SET 
                date_deleted = NOW() 
            WHERE 
                id = $1 
            RETURNING *`
        const deletedseller = await pool.query(query, [ id ]);
        res.status(200).json(deletedseller.rows);
    }
    catch (err) {
        console.error(err, 'from deletesellers')
        res.sendStatus(500);
    }
}


const example = { 
    "deleted": [
        {
            "id": "3",
            "address_1": "17264 DE demn you",
            "address_2": null,
            "city": "Portland",
            "us_state": "OR",
            "zip_code": 24323,
            "address_full": "17264 DE demn you Portland OR 24323",
            "full_name": "Jaerry Larson",
            "phone_number": "(971) 998-2695",
            "email": "poop@gmail.com",
            "reason": "house burned down",
            "time_frame": "asap",
            "price": null,
            "date_created": "2023-01-15T00:00:00.000Z",
            "date_updated": null,
            "date_deleted": null
        }
   ]
 }

export const deleteMultiplesellers = async (req: Request, res: Response)=> {
    try {
        //deleted should be array of all sellers to be sold / deleted
        const { deleted } = req.body;
        const idArr = deleted.map((seller: isellers) => seller.id)
        let query = 'UPDATE sellers SET date_deleted = NOW() WHERE id IN ('
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
        const deletedseller = await pool.query(query, idArr);
        res.status(200).json(deletedseller.rows);
    }
    catch (err) {
        console.error(err, 'from deletesellers')
        res.sendStatus(500);
    }
}