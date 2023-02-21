import pool from "../util/connect-pg";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';

//different routes will need different api keys
//each of these middleware will be used depending on which application they come from

export const authSusenKey = async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const key = req.header('x-api-key')
        const query = `SELECT * FROM vw_auth WHERE role_id = 4 LIMIT 1;`;
        const { rows } = await pool.query(query)
        const match = await bcrypt.compare(key!, rows[0].api_key)
        if (match) {
            next()
        }
        else {
            res.status(400).send({ message: 'Key not authorized for SUSEN' })
        }
    }
    catch (err) {
        console.error(err)
    }
}

export const authAdminKey = async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const key = req.header('x-api-key')
        const query = `SELECT * FROM vw_auth role_id = 5 LIMIT 1;`;        
        const { rows } = await pool.query(query)
        const match = await bcrypt.compare(key!, rows[0].api_key)
        if (match) {
            next()
        }
        else {
            res.status(400).send({ message: 'Key not authorized for SEAD' })
        }
    }
    catch (err) {
        console.error(err, 'from authorizeAdminKey')
        res.sendStatus(500).send('key is not valid');
    }
}

