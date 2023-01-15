import nodemailer from "nodemailer";
import { Request, Response } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

export const sendEmailToSeller = async (req: Request, res: Response) => { 
    try {
        const { address, name, email, domain } = req.query;
        const transportOptions = { 
            // host: "smtp.mail.yahoo.com",
            // port: 465,
            // secure: false,
            service: process.env.EMAIL_SERVICE,
            auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD,
            },
            // debug: false,
            // logger: true
        }
        const transporter = nodemailer.createTransport(transportOptions);
        
        const mailOptions = {
            from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER_NAME}>`,
            to: `${email}`,
            subject: `Finding Cash Buyers for ${name}`,
            text: `Hello ${name}`,
            html: 
            `<p>Hello ${name},</p>
            <p>We appreciate you for using ${domain}! A cash buyer will contact you about your property ${address} soon. </p>


            <p>Much Thanks, </p>
            <p>The team at ${domain}</p></p>
            `,
            // headers: { 'x-myheader': 'test header' }
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

export const sendEmailToBuyer = (req: Request, res: Response) => { 

}