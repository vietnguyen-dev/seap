import pool from "../util/connect-pg"
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { iContacts } from "../../interfaces/iContact";

export const getContacts: RequestHandler = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const { rows } = await pool.query("SELECT * FROM vw_contacts ORDER BY id ASC LIMIT 50;");
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err, 'from getsellers')
        res.status(500).send('Hello There');
    }
}

export const getContactsForUser: RequestHandler = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        pool.query("SELECT * FROM vw_contacts WHERE user_id = $1 ORDER BY id ASC;", [ id ], (error, results) => {
            if (error) {
                console.log(error)
            }
            else {
                res.status(200).send(results.rows);
            }
        });
    }
    catch (err) {
        console.error(err, 'from getContacts')
        res.status(500).send('Hello There');
    }
}

export const postContact: RequestHandler = async (req: Request, res:Response, next: NextFunction) => {
    try {
        let valuesArr = Object.values(req.body)    
        const query = `INSERT INTO contacts (first_name, last_name, phone, email, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
        pool.query(query, valuesArr, (err, result) => {
            if(err) {
                console.error(err)
            }
            else {
                res.status(201).send(result.rows);
            }
        });
    }
    catch (err) {
        console.error(err, 'from postsellers')
        res.status(400);
    }
}

export const preventExistingContact: RequestHandler = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const { firstName, lastName, phone, email, userId } = req.body;
        const query = 'SELECT * FROM vw_contacts WHERE user_id = $1;'
        pool.query(query, [ userId ], (err, result) => {
            if(err) {
                console.error(err)
            }
            else {
                const doesUserWithName = result.rows.filter((contact: iContacts )=> contact.first_name === firstName && contact.last_name === lastName)
                const doesUserWithEmailExist = result.rows.filter((contact: iContacts ) => contact.email === email)
                const doesUserWithPhoneExist = result.rows.filter((contact: iContacts ) => contact.email === phone)
                
                if (doesUserWithName.length > 0 || doesUserWithEmailExist.length > 0 || doesUserWithPhoneExist.length > 0) {
                    res.status(400).json({ message: 'Contact with this information already exists'})
                }
                else {
                    next()
                }                
            }
        })
    }
    catch (err) {
        console.error(err, 'from preventExistingContact')
        res.sendStatus(500);
    }
}

export const putContact: RequestHandler = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const valuesArr  = Object.values(req.body)
        const userId = valuesArr.pop()
        console.log(valuesArr)
        const query = `UPDATE contacts SET first_name = $2, last_name = $3 phone = $4 email = $5 date_updated = NOW() WHERE id = $1 RETURNING *`
        await pool.query(query, valuesArr);
        pool.query("SELECT * FROM vw_contacts WHERE user_id = $1 ORDER BY id ASC LIMIT 50;", [userId], (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
            res.status(200).send(result.rows);
            }
        });
    }
    catch (err) {
        console.error(err, req.body, 'from putContact')
        res.sendStatus(500);
    }
}

export const deleteContact: RequestHandler = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const query = `UPDATE contacts SET date_deleted = NOW() WHERE id = $1 RETURNING *`
        pool.query(query, [ id ], (error, result) => {
            if (error) {
                console.error(error)
            }
            else {
                res.status(200).json(result.rows);
            }
        });
    }
    catch (err) {
        console.error(err, req.body, 'from deleteContact')
        res.sendStatus(500);
    }
}