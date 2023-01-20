import pool from "../../connect";
import bcrypt from "bcrypt";

import { Request, Response } from 'express';

const example = {
    "firstName": "Viet",
    "lastName": "Nguyen",
    "userName": "vietnguyen-dev",
    "email": "vietnguyent22@gmail.com",
    "password": "VeraHasNiceBoobs:3",
    "dateCreated": "10/12/2022"
}

const example2 = {
    "firstName": "Vera",
    "lastName": "Zherebnenko",
    "userName": "v.zheb-dev",
    "email": "vera.zh165@gmail.com",
    "password": "VietHasANiceButt;)",
    "roleId": 2,
    "dateCreated": "10/12/2022"
}

export const postUsers= async (req: Request, res: Response) => { 
    try {
        const { firstName, lastName, userName, email, password, roleId, dateCreated } = req.body;
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {
                console.error(err, 'trouble genSalt in postUsers')
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    console.error(err, 'trouble bcrypt.hash in postUsers')
                }
                const valuesArr = [ firstName, lastName, userName, email, hash, roleId, dateCreated]
                const query = 
                    `INSERT INTO users 
                        (first_name, last_name, user_name, email_address, pass_word, user_role_id, date_created)
                    VALUES
                        ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *;`
                pool.query(query, valuesArr, (err, results) => {
                    if(err) {
                        console.error(err, 'bad query from postUsers')
                    }
                    else {
                        res.send(results.rows);
                    }
                })
            });
        });
    }
    catch(err) {
        console.error(err, 'from postUsers');
        res.sendStatus(500);
    }
}