import pool from "../util/connect-pg";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { Request, Response, RequestHandler } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

export const postDeveloperKey: RequestHandler = async (req: Request, res: Response) => { 
    try {
        const devId = req.params.id
        const newKey = uuid()
        console.log(newKey);
        const saltRounds = parseInt(process.env.SALT!);
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.error(err, 'trouble genSalt from postDeveloperKey')
            }
            bcrypt.hash(newKey, salt, (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    console.error(err, 'trouble hash from postDeveloperKey')
                }
                const query = 
                    `INSERT INTO api_keys 
                        (api_key, Developer_id) 
                    VALUES 
                        ($1, $2);`
                pool.query(query, [hash, devId], (err, result) => {
                    if(err) {
                        console.error(err, 'bad query from postDeveloperKey')
                    }
                    else {
                        res.send({ key: newKey })
                    }
                })
            });
        });

    }
    catch (err) {
        console.error(err, 'from postDeveloperKey')
    }
}