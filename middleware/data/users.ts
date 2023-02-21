import pool from "../util/connect-pg";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response, RequestHandler } from 'express';

export const getUsers: RequestHandler = async (req: Request, res: Response) => { 
    pool.query("SELECT * FROM vw_users ORDER BY id ASC LIMIT 50;", (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            res.status(200).send(result.rows);
        }
    });
}

export const getSingleUser: RequestHandler = async (req: Request, res: Response) => { 
    try {
        const query = 'SELECT * FROM vw_users WHERE id = $1'
        pool.query(query, [req.params.id ], (err, result) => {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send(result.rows);
            }
        } )
    }
    catch (err) {
        console.error(err)
    }
}

export const postUser: RequestHandler = async (req: Request, res: Response) => {
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
                        res.status(200).send(results.rows);
                    }
                })
            });
        });
    } 
    catch (err) {
        console.log(err)
    }
}

export const preventExistingUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { email, username } = req.body
        const query = 
            `SELECT * 
            FROM vw_users 
            WHERE 
                username = $1
            OR 
                email = $2;`
        pool.query(query, [username, email], (err, results) => {
            if(err) {
                console.error(err, 'bad query from preventExistingUser')
            }
            else {
                if (results.rows.length > 0) {
                    res.status(400).send('user with this username or email already exists');
                }
                else {
                    next()
                }
            }
        })
    }
    catch (err) {
        console.error(err)
    }
}

export const putUser: RequestHandler = async (req: Request, res: Response) => { 
   try {
        const { id, firstName, lastName, username, email, password } = req.body
        const { rows } = await pool.query('SELECT id, pass_word FROM vw_users WHERE id = $1', [ id ])
        console.log(rows)
        //differing logic when password has not changed
        const match = await bcrypt.compare(password, rows[0].pass_word)
        if (match) {
            const valuesArr = [ id, firstName, lastName, username, email ]
            const query = 
                `UPDATE users
                SET
                    first_name = $2,
                    last_name = $3,
                    username = $4,
                    email = $5,
                    date_updated = NOW()
                WHERE
                    id = $1
                RETURNING *`;
            pool.query(query, valuesArr, (err, results) => {
                if(err) {
                    console.error(err, 'bad query from putUsers')
                }
                else {
                    res.status(200).send(results.rows);
                }
            })
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                if(err) {
                    console.error(err, 'trouble genSalt in putUser')
                }
                else {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) {
                            console.error(err, 'trouble bcrypt.hash in putUser')
                        }
                        const valuesArr = [ id, firstName, lastName, username, email, hash ]
                        const query = 
                            `UPDATE users
                            SET
                                first_name = $2,
                                last_name = $3,
                                username = $4,
                                email = $5,
                                pass_word = $6,
                                date_updated = NOW()
                            WHERE
                                id = $1
                            RETURNING *`;
                        pool.query(query, valuesArr, (err, results) => {
                            if(err) {
                                console.error(err, 'bad query from putUsers with new password')
                            }
                            else {
                                res.status(200).send(results.rows);
                            }
                        })
                    });
                }
            });
        }
        
   }
   catch (err)  {
        console.error(err)
   }
}

export const preventExistingPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { id, password } = req.body
        const query = 'SELECT * FROM vw_users WHERE id = $1'
        let { rows } = await pool.query(query, [ id ]);
        const match = await bcrypt.compare(rows[0].pass_word, password as string)
        if (match) {
            res.status(400).send('Do not use your current password')
        } 
        next()
    }
    catch (err) {
        console.error(err);
    }
}


export const deleteUser: RequestHandler = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const query = 'UPDATE users SET date_deleted = NOW() WHERE id = $1 RETURNING *;'
        pool.query(query, [ id ], (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).send(result.rows)
            }
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).send('API Error');
    }
}
