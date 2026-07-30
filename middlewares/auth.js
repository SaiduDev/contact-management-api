import jwt from "jsonwebtoken";
import dotenv from "dotenv";


let verifyToken = (req, res, next)=>{
    
    let authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(404).json({message: "No Token Provided, please provide token"})
    }

    let token = authHeader.split(" ")[1];

    let decoded = jwt.verify(token, process.env.JWT_secret);

    req.user = decoded;

    next();
}