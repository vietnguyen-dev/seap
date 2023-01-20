import express from "express";
import * as dotenv from 'dotenv';

import { getLeads, postLeads, preventExistingLead, putLeads, deleteSingleLead, deleteMultipleLeads } from "../middleware/data/leads";
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
app.get("/", authorizeKey, getLeads);
app.post("/", authorizeKey, preventExistingLead, postLeads)
app.put("/", authorizeKey, putLeads);
app.delete("/:id", authorizeKey, deleteSingleLead)
app.delete("/", authorizeKey, deleteMultipleLeads)


//email
app.get("/email-seller", authorizeKey, sendEmailToSeller)
app.put('/email-buyer', authorizeKey, sendEmailToBuyer)


//users - for dev use only
// no other routes because other routes should only be done in sql
app.post('/user', authorizeAdminKey, postUsers);
app.post('/user/key', authorizeAdminKey, postUserKey)

app.listen(port, () => {
  console.log(`LEAP listening at http://localhost:${port}`);
});


export default app;