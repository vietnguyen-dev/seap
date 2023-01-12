import pool from "./connect"

export const getLeads = async (req: any, res: any) => {
    try {
        const { rows } = await pool.query("SELECT * FROM leads;");
        res.send(rows);
    }
    catch (err) {
        console.log(process.env)
        console.error(err, 'getLeads')
        res.sendStatus(500);
    }
    
}

export const postLeads = async (req: any, res: any) => {
    try {
        console.log(req.body)
        // const { fullName, phoneNumber, email, reason, timeFrame, price, dateCreated } = req.body
        // const newLeads = await pool.query(
        //     `INSERT INTO leads (full_name, phone number, email, reason, time_frame, price, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        // , [ fullName, phoneNumber, email, reason, timeFrame, price, dateCreated ])
        // res.json(newLeads.rows);
      }
      catch (err) {
          console.error(err, 'postLeads')
          res.sendStatus(500);
      }
}

export const putLeads = async (req: any, res: any) => {

}

export const deleteLeads = async (req: any, res: any) => {

}