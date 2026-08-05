import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../db config/db.js";
import dotenv from "dotenv";

dotenv.config();

// registration controller
export let signup = async (req, res) => {
    let { fullName, email, password} = req.body;

    try {
        let findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(findUser.rows.length > 0){
           return res.status(409).json({message: "Email already existed"});
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        let user = findUser.rows[0];
        let result = await pool.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *", [fullName, email, hashedPassword]);

        let token = jwt.sign(
            {id: result.rows[0].id},
            process.env.JWT_secret,
            {expiresIn: "5h"}
        );

        res.status(201).json({message: "User created successfully", token});

    } catch (error) {
        res.status(500).json({message: "registration failed, please try again"})
        console.error(error)
    }
}
    // Log in controller
export let login = async (req, res) => {
    let {email, password} = req.body;

    try{
        let checkEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(checkEmail.rows.length === 0){
            return res.status(404).json({message: "account not found"});
        }
        let user = checkEmail.rows[0];

        let checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(401).json({message: "wrong password please try again"});
        }

        let token = jwt.sign(
            {id: user.id},
            process.env.JWT_secret,
            {expiresIn: "5h"}
        );

        res.status(201).json({token});
    }catch(error){
    res.status(500).json({message: "login failed, something went wrong"});
     console.error(error)

    }

}
    // fetch All user profile from the database
export let getUserProfile = async (req, res) => {
    
    try {
        let data = await pool.query("SELECT id, name, email, phone, bio FROM users WHERE id = $1", [req.user.id]);
        res.status(200).json(data.rows[0]);
    } catch (error) {
        res.status(500).json({message: "unable to fetch data, something went wrong"});
        console.error(error)

    }
}

// updating the user profile
export let updateProfile = async (req, res) => {
    try {
         let userId = req.user.id;

        let { fullName, email, phone, bio } = req.body;
    
        let updatedProfile = await pool.query("UPDATE users SET name = $1, email = $2, phone = $3, bio = $4 WHERE id = $5 RETURNING *", [fullName, email, phone, bio , userId]);
        
        res.status(200).json("edited successfully");
    } catch (error) {
        res.status(500).json({message: "failed to update profile"});
        console.error(error);
    }
}