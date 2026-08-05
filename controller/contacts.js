import pool from "../db config/db.js";

export let getContacts = async (req, res) => {
    try {
        let userId = req.user.id;
        let contacts = await pool.query("SELECT * FROM contacts WHERE user_id = $1", [userId]);

        res.status(200).json(contacts.rows);
    } catch (error) {
        res.status(500).json({message: "failed to fetch contact data"})
    }
}

export let postContact = async (req, res) => {
    try {
        let {name, phone} = req.body;

        let contact = await pool.query("INSERT INTO contacts (name, phone, user_id) VALUES($1, $2, $3) RETURNING *", [name, phone, req.user.id]);

        res.status(201).json({message: "contact saved"});
    } catch (error) {
    res.status(500).json({message: "error occurred, contact not saved"});
    console.log(error.message);
    }    
}

export let editContact = async (req, res) => {
    
    try {
        let {id} = req.params;
      let {name, phone} = req.body;
        
      let result = await pool.query("UPDATE contacts SET name = $1, phone = $2 WHERE id = $3 RETURNING *", [name, phone, id]);

      res.status(201).json({message: "edited successfully"});
    } catch (error) {
        res.status(500).json({message: "edit failed something went wrong"});
        console.log(error.message)
    }
}

export let removeContact = async (req, res) => {
    try {
        let {id} = req.params;

        let result = await pool.query("DELETE FROM contacts WHERE id = $1 RETURNING *", [id]);
        res.status(200).json({message: "deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message: "delete failed, something went wrong"});
    }
}