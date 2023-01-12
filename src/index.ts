import express from "express";
import * as dotenv from 'dotenv';
import { getLeads, postLeads } from "../middleware/leads-middleware";

const app = express();
const port = 3333;
dotenv.config()

app.get('/', (req: any, res: any) => {
  res.send('<h1>HELLO USER</h1>')
})

app.get("/leads", getLeads);
app.post("/leads", postLeads)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`);
});
