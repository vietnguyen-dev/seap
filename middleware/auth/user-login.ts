import pool from "../util/connect-pg";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction, RequestHandler } from 'express';


import ideveloper from '../../interfaces/ideveloper';

import { ifEmpty } from '../util/empty'

//when a user logs in they go through several middlewares in this order

export interface CustomRequest extends Request {
    requestingUser?: ideveloper;
    Session?: {
        sid: string,
    }
  }

//   doesnt include session in request?
declare module 'express-session' {
    export interface SessionData {
      sid: string;
    }
  }

//1. if any fields are empty
export const userCredentials: RequestHandler = (req: CustomRequest, res:Response, next: NextFunction) => {
    const { usernameOrEmail, password } = req.body
    console.log('reaching here')

    const user = ifEmpty(usernameOrEmail) 
    const pass = ifEmpty(password)

    //check if values entered are empty and send error message if they are
    if (user && pass) {
        res.status(400).send('Empty Fields Entered')
        return
    }
    else {
        next()
    }
}

//2. check if they acutally exists
export const userExists: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
    const { usernameOrEmail } = req.body

    //queries from postgres to see if user exists checking email or username
    //if user doesnt exist return error message
    const query = `SELECT * FROM vw_users WHERE username = $1 OR email = $1 ORDER BY id ASC;`
    pool.query(query, [usernameOrEmail], (err, result) => {
        if(err) {
            console.error(err, 'bad query from userExists')
        }
        else {
            if (result.rows.length > 0 && result.rows.length === 1) {
                //this will pass down the results to the correctPasswordForUser middleware
                req.requestingUser =  result.rows[0]
                console.log(req.requestingUser);
                next()
            }
            else {
                res.status(400).send('User Does not exists')
            }
        }
    }) 
}

// 3. check if they have the correct password
export const correctPasswordForUser: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
    const { password } = req.body

    const match = await bcrypt.compare(password as string, req?.requestingUser?.pass_word as string)
    if (match) {
        next()
    } 
    else {
        res.status(400).send('Incorrect Password')
    }
}

//4. log the user in
export const userLogin: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
    const sid = uuid()
    //creates record in redis with session id with session store
    req.session.sid = sid
    console.log(req.session)
    const user = req.requestingUser
    delete user?.pass_word
    res.status(200).send(user)
}


export const userLogout: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
    req.session.destroy(() => {
        console.log('session destroyed')
        console.log(req.session)
        // redirect to login page once created app
        // res.redirect('/')
    })
    res.end()
}

export const keepUserLoggedIn: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
    //check if session is existing in store
    //get existing session of user and add time onto it
}

//middleware for all requests to check if the user has a session id
export const checkSession: RequestHandler = async (req: Request, res:Response, next: NextFunction) => {
    console.log(req.session)
    const loginPaths = [ '/user-login', '/user-logout' ] 
    const isLoginPath = loginPaths.includes(req.url)
    if (isLoginPath) {
        next()
    }
    else {
        if (req.session.sid) {
            next()
        }
        else {
            console.log(req.session)
            res.status(400).json({ message: 'not in a session, action not permiteed'})
        }
    }
}
