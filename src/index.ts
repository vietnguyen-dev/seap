import express from "express";
import * as dotenv from 'dotenv';

import { getLeads, postLeads, putLeads, deleteLeads } from "../middleware/leads-middleware";
import { sendEmailToBuyer, sendEmailToSeller } from "../middleware/email-middleware";

const app = express();
const port = process.env.PORT;
dotenv.config()

app.use(express.json());

app.get("/", getLeads);
app.post("/", postLeads)
app.put("/", putLeads);
app.delete("/", deleteLeads)

app.get("/email-seller", sendEmailToSeller)
app.put('/email-buyer', sendEmailToBuyer)

app.listen(port, () => {
  console.log(`LEAP listening at http://localhost:${process.env.PORT}`);
});
