import pool from "../../connect";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from 'express';

const test = { 
    "firstName": "Viet",
    "lastName": "Nguyen",
    "username": "vietnguyen-dev", 
    "email": "vietnguyent22@gmail.com", 
    "password": "Ihatevegetables99!"
}

const test2 = { 
    "firstName": "Vera",
    "lastName": "Zherebnenko",
    "username": "vzh165", 
    "email": "vzh165@gmail.com", 
    "password": "Ihatefrogs99!"
}

export const getUsers = async (req: Request, res: Response) => { 

}

export const postUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, email, password } = req.body
        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                console.error(err, 'trouble genSalt in postUser')
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    console.error(err, 'trouble bcrypt.hash in postUser')
                }
                const valuesArr = [ firstName, lastName, username, email, hash ]
                const query = 
                    `INSERT INTO users 
                        (first_name, last_name, username, email, pass_word)
                    VALUES
                        ($1, $2, $3, $4, $5)
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
    catch (err) {
        console.log(err)
    }
}

export const preventExistingUser = async (req: Request, res: Response, next: NextFunction) => { 
    const valuesArr = Object.values(req.body)
    const query = 
        `SELECT * 
        FROM vw_users 
        WHERE 
            username = $1
        OR 
            email = $2
        RETURNING *`
    pool.query(query, valuesArr, (err, results) => {
        if(err) {
            console.error(err, 'bad query from postUsers')
        }
        else {
            if (results.rows.length > 0) {
                res.send(400);
            }
            else {
                next()
            }
            
        }
    })
}

export const putUser = async (req: Request, res: Response) => { 

}


export const deleteUser = async (req: Request, res: Response) => { 

}
