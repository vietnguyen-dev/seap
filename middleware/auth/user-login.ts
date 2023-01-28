import pool from '../../connect';
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';

import { ifEmpty } from '../util/empty';

interface IGetUserAuthInfoRequest extends Request {
    locals: {
        result: {
            rows: Array<any>
        }
    } // or any other type
  }

//when a user logs in they go through several middlewares in this order

//1. if any fields are empty
export const userCredentials = (req: Request, res:Response, next: NextFunction) => {
    const { usernameOrEmail, password } = req.body

    const user = ifEmpty(usernameOrEmail) 
    const pass = ifEmpty(password)

    //check if values entered are empty and send error message if they are
    if (user && pass) {
        res.status(400).send('Empty Fields Entered')
    }
    else {
        next()
    }
}

//2. check if they acutally exists
export const userExists = async (req: Request, res:Response, next: NextFunction) => {
    const { usernameOrEmail } = req.body

    //queries from postgres to see if user exists checking email or username
    //if user doesnt exist return error message
    const query = `SELECT * FROM vw_users WHERE username = $1 OR email = $1 ORDER BY id ASC;`
    pool.query(query, [usernameOrEmail], (err, result) => {
        if(err) {
            console.error(err, 'bad query from postDeveloperKey')
        }
        else {
            if (result.rows.length > 0 && result.rows.length === 1) {
                //this will pass down the results to the correctPasswordForUser middleware
                req['requestingUser'] =  result.rows[0]
                next()
            }
            else {
                res.status(400).send('User Does not exists')
            }
        }
    }) 
}

// 3. check if they have the correct password
export const correctPasswordForUser = async (req: Request, res:Response, next: NextFunction) => {
    const { password } = req.body

    const match = await bcrypt.compare(password as string, req['requestingUser'].pass_word)
    if (match) {
        next()
    } 
    else {
        res.status(400).send('Incorrect Password')
    }
}

//4. log the user in
export const userLogin = async (req: Request, res:Response, next: NextFunction) => {
    // create sesssion with express session, store in redis, then send to user
    console.log('Credentials True, Log me in')
    res.end()
}


const userLogout = async (req: Request, res:Response, next: NextFunction) => {
    //delete value in redis
}

const keepUserLoggedIn = async (req: Request, res:Response, next: NextFunction) => {
    //check if session is existing in redis
    //get existing session of user and add time onto it
}