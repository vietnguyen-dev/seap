import pool from "../../connect";
import bcrypt from "bcrypt";

import { Request, Response } from 'express';

const example = {
    "firstName": "Viet",
    "lastName": "Nguyen",
    "DeveloperName": "vietnguyen-dev",
    "email": "vietnguyent22@gmail.com",
    "password": "VeraHasNiceBoobs:3",
    "dateCreated": "10/12/2022"
}

const example2 = {
    "firstName": "Vera",
    "lastName": "Zherebnenko",
    "DeveloperName": "v.zheb-dev",
    "email": "vera.zh165@gmail.com",
    "password": "VietHasANiceButt;)",
    "roleId": 2,
    "dateCreated": "10/12/2022"
}

//commend to test
//testing staging push


export const postDeveloper= async (req: Request, res: Response) => { 
    try {
        const { firstName, lastName, username, email, password, roleId } = req.body;
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {
                console.error(err, 'trouble genSalt in postDevelopers')
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    console.error(err, 'trouble bcrypt.hash in postDevelopers')
                }
                const valuesArr = [ firstName, lastName, username, email, hash, roleId ]
                const query = 
                    `INSERT INTO developers 
                        (first_name, last_name, username, email, pass_word, developer_role_id)
                    VALUES
                        ($1, $2, $3, $4, $5, $6)
                    RETURNING *;`
                pool.query(query, valuesArr, (err, results) => {
                    if(err) {
                        console.error(err, 'bad query from postDevelopers')
                    }
                    else {
                        res.send(results.rows);
                    }
                })
            });
        });
    }
    catch(err) {
        console.error(err, 'from postDevelopers');
        res.sendStatus(500);
    }
}