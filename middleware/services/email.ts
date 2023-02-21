import nodemailer from "nodemailer";
import { Request, Response } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

export const sendEmailToSeller = async (req: Request, res: Response) => { 
    try {
        const { address, firstName, email, domain } = req.body;
        const transportOptions = { 
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        }
        const transporter = nodemailer.createTransport(transportOptions);
        
        const mailOptions = {
            from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER_NAME}>`,
            to: `${email}`,
            subject: `Finding Cash Buyers for ${firstName}`,
            text: `Hello ${firstName}`,
            html: 
            `<p>Hello ${firstName},</p>
            <p>We appreciate you for using ${domain}! A cash buyer will contact you about your property ${address} soon. </p>
            <br/>
            <br/>
            <p>Much Thanks, </p>
            <p>The team at ${domain}</p></p>
            `,
          }
        const info = await transporter.sendMail(mailOptions);
        
        console.log(info)

        res.status(200).end();

    }
    catch (err) {
        console.error(err, 'from sendEmailToSseeller')
        res.sendStatus(500);
    }
   
}

const example = {
    "firstName": "Viet",
    "email": "vietnguyent22@gmail.com",
    "sellerInfo": [
        {
          "id": 1,
          "address_1": "17264 DE demn you",
          "address_2": null,
          "city": "Portland",
          "us_state": "OR",
          "zip_code": 24323,
          "address_full": "17264 DE demn you Portland OR 24323",
          "first_name": "Jaerry",
          "last_name": "Larson",
          "phone": "(971) 998-2695",
          "email": "poop@gmail.com",
          "reason": "house burned down",
          "time_frame": "asap",
          "price": null,
          "date_created": "2023-01-24T08:00:00.000Z",
          "date_updated": null,
          "date_deleted": null
        },
        {
          "id": 2,
          "address_1": "98984 NE frisk you",
          "address_2": null,
          "city": "Milwaukie",
          "us_state": "OR",
          "zip_code": 98682,
          "address_full": "98984 NE frisk you Milwaukie OR 98682",
          "first_name": "Park",
          "last_name": " Hill",
          "phone": "(971) 123-3233",
          "email": "park.homes@gmail.com",
          "reason": "divorce",
          "time_frame": "3 months",
          "price": "325000.00",
          "date_created": "2023-01-24T08:00:00.000Z",
          "date_updated": null,
          "date_deleted": null
        }
    ]
}



export const sendEmailToContact = async (req: Request, res: Response) => { 
    try {
        const { firstName, email, sellerInfo } = req.body;
        if (sellerInfo?.length === 0) {
            res.status(400).send('No seller info added')
        }

        const transportOptions = { 
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        }
        const transporter = nodemailer.createTransport(transportOptions);

        let html = ''
        for (let i = 0; i < sellerInfo?.length!; i++) {
            const { address_full, first_name, last_name, email, phone, reason, time_frame, price} = sellerInfo[i]
            const address = `Address: ${address_full}`
            const name = `Name: ${first_name} ${last_name}`
            const phoneContact = `Phone: ${phone}`
            const emailContact = `Email: ${email}`
            const sellerReason = `Reason: ${reason}`
            const timeToSell = `Time to Sell: ${time_frame}`
            const dollars = `Price: ${price === null ? 'n/a' : price}`

            const content = 
            `<p>${address}</p>
            <p>${name}</p>
            <p>${phoneContact}</p>
            <p>${emailContact}</p>
            <p>${sellerReason}</p>
            <p>${timeToSell}</p>
            <p>${dollars}</p>
            <br/>
            <br/>`

            html += content
        }

        const mailOptions = {
            from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER_NAME}>`,
            to: `${email}`,
            subject: `Motivated Sellers for ${firstName}`,
            text: `Hello ${firstName}`,
            html: html,
          }
        const info = await transporter.sendMail(mailOptions);
        
        console.log(info)

        res.status(200).end();
    }
       catch (err) {

    }
    
}