import pool from "../connect"

export const getLeads = async (req: any, res: any) => {
    try {
        const { rows } = await pool.query("SELECT * FROM leads ORDER BY id ASC;");
        res.send(rows);
    }
    catch (err) {
        console.log(process.env)
        console.error(err, 'from getLeads')
        res.sendStatus(500);
    }
}

export const postLeads = async (req: any, res: any) => {
    try {
        const { fullName, phoneNumber, email, reason, timeFrame, price, dateCreated } = req.body;
        const query = `INSERT INTO leads 
            (full_name, phone_number, email, reason, time_frame, price, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const newLeads = await pool.query(query, [ fullName, phoneNumber, email, reason, timeFrame, price, dateCreated ]);
        res.json(newLeads.rows);
    }
    catch (err) {
        console.error(err, 'from postLeads')
        res.sendStatus(500);
    }
}

export const putLeads = async (req: any, res: any) => {
    try {
        const { id, fullName, phoneNumber, email, reason, timeFrame, price, dateDeleted } = req.body;
        const query = `UPDATE leads SET 
            full_name = $2, 
            phone_number = $3, 
            email = $4, 
            reason = $5, 
            time_frame = $6,
            price = $7,
            date_deleted = $8
            WHERE id = $1 RETURNING *`
        await pool.query(query, [ id, fullName, phoneNumber, email, reason, timeFrame, price, dateDeleted ]);
        const { rows } = await pool.query("SELECT * FROM leads ORDER BY id ASC;");
        res.send(rows);
    }
    catch (err) {
        console.error(err, 'from putLeads')
        res.sendStatus(500);
    }
}

export const deleteLeads = async (req: any, res: any) => {
    try {
        const { id } = req.query;
        const query = `DELETE FROM leads WHERE id = $1 RETURNING *`
        const deletedLead = await pool.query(query, [ id ]);
        console.log(deletedLead, 'deleting lead')
        res.json(deletedLead.rows);
    }
    catch (err) {
        console.error(err, 'from deleteLeads')
        res.sendStatus(500);
    }
}


