import pool from "../../connect";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

export const postUserKey = async (req: Request, res: Response) => { 
    try {
        const devId = req.query.userId
        const newKey = uuid()
        console.log(newKey);
        const saltRounds = parseInt(process.env.SALT!);
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.error(err, 'trouble genSalt from postUserKey')
            }
            bcrypt.hash(newKey, salt, (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    console.error(err, 'trouble hash from postUserKey')
                }
                const query = 
                    `INSERT INTO api_keys 
                        (api_key, user_id) 
                    VALUES 
                        ($1, $2);`
                pool.query(query, [hash, devId], (err, result) => {
                    if(err) {
                        console.error(err, 'bad query from postUserKey')
                    }
                    else {
                        res.send(result.rows)
                    }
                })
            });
        });

    }
    catch (err) {
        console.error(err, 'from postUserKey')
    }
}