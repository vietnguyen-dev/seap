import express from "express";
import * as dotenv from 'dotenv';

import { getSellers, postSeller, putSeller, deleteSingleSeller, deleteMultiplesellers } from "../middleware/data/sellers";
import { sendEmailToBuyer, sendEmailToSeller } from "../middleware/services/email";
import { postUsers } from "../middleware/data/users";
import { postUserKey } from "../middleware/data/user-key";
import { authorizeKey, authorizeAdminKey } from "../middleware/auth/keys";

import { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT;
dotenv.config()

app.use(express.json());

//use app.all to add authorize key to all routes once it is done
// app.all('*', requireAuthentication)

//leads
app.get("/", getSellers);
app.post("/", postSeller)
app.put("/",  putSeller);
app.delete("/:id", deleteSingleSeller)
app.delete("/", deleteMultiplesellers)


//email
app.get("/email-seller", sendEmailToSeller)
app.put('/email-buyer', sendEmailToBuyer)


//users - for dev use only

// no other routes because other routes should only be done in sql
app.post('/developer', postUsers);
app.post('/developer/key', postUserKey)

app.listen(port, () => {
  console.log(`SEAP listening at http://localhost:${port}`);
});


export default app;