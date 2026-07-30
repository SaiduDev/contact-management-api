import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../db config/db.js";
import dotenv from "dotenv";

export let registerUser = async (req, res) => {
    let {name, email, password} = req.body;

    try {
        let findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(findUser.rows.length > 0){
            res.status(409).json({message: "email already existed"});
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let savedUser = await pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3)", [name, email, hashedPassword]);

        res.status(201).json({message: "Account created successfully"});
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

export let signIn = async (req, res) => {
    let {email, password} = req.body;

    try {
        let checkUser  = await pool.query("SELECT * FROM users WHERE email = $1" [email]);
        
        if(checkUser.rows.length === 0){
            res.status(404).json({message: "user not found"});

        }

        let user = checkUser.rows[0];

        let checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            res.status(400).json({message: "email or password is incorrect"});
        }

        let token = jwt.sign(
            {id: user.id},
            process.env.JWT_secret,
            {expiresIn: "3h"}
        );

        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({message: "somethings went wrong"});
    }
}