import { Request, Response, NextFunction } from 'express';

// write middleware to check if differnt route info are empty
//post and put need not empty req.body
//delete need not empty req.query

interface ifEmpty {
    value: string
}

export const ifEmpty = (value: string | number): boolean => {
    console.log(value)
    if (value === '' || value === null || value === undefined) {
        return true
    }
    else {
        return false
    }
}