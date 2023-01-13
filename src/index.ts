import express from "express";
import * as dotenv from 'dotenv';
import { getLeads, postLeads, putLeads, deleteLeads } from "../middleware/leads-middleware";

const app = express();
const port = process.env.PORT;
dotenv.config()

app.use(express.json());

app.get('/', (req: any, res: any) => {
  res.send('<h1>HELLO USER</h1>')
})

app.get("/leads", getLeads);
app.post("/leads", postLeads)
app.put("/leads", putLeads);
app.delete("/leads", deleteLeads)

app.listen(port, () => {
  console.log(`Leadpie app listening at http://localhost:${process.env.PORT}`);
});
