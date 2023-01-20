import pool from '../../connect';
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';

export const authorizeKey = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const key = req.header('x-api-key')
        const email = req.header('email')
        const query = 
            `SELECT 
                *
            FROM vw_auth_key
            WHERE 
                email_address = $1 
            ORDER BY 
                dev_id ASC`;
        pool.query(query, [ email ], async (err, results) => {
            if(err) {
                res.send('403 Not Allowed: bad database connection')
            }
            else {
                const rows = results.rows;           
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length;  i++) {
                        const match = await bcrypt.compare(key as string, rows[i].api_key)
                        if (!!match) {
                            next()
                        }
                    }
                }
                else {
                    res.send('403 Not Allowed: Missing Credentials');
                }
            }
        })
    }
    catch (err) {
        console.error(err, 'from authorizeKey')
        res.sendStatus(500).send('key is not valid');
    }
}

export const authorizeAdminKey = async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const key = req.header('x-api-key')
        const email = req.header('email')
        const query = 
            `SELECT 
                *
            FROM vw_auth_key
            WHERE 
                email_address = $1 
            AND 
                role_id = $2
            ORDER BY 
                dev_id ASC`;
        pool.query(query, [ email, 1], async (err, results) => {
            if(err) {
                res.send('403 Not Allowed: bad database connection')
            }
            else {
                const rows = results.rows;
                console.log(rows)
                if (rows.length === 0) {
                    res.send('403 Not Allowed: no records')
                }
                else if (rows.length > 0) {
                    for (let i = 0; i < rows.length;  i++) {
                        const match = await bcrypt.compare(key as string, rows[i].api_key)
                        if (!!match) {
                            next()
                        }
                    }
                }
                else {
                    res.send('403 Not Allowed: no email matching key')
                }
            }
        })
    }
    catch (err) {
        console.error(err, 'from authorizeAdminKey')
        res.sendStatus(500).send('key is not valid');
    }
}

