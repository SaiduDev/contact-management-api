import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


// let pool = new Pool({
//     user: process.env.DB_user,
//     host: process.env.DB_host,
//     database: process.env.DB_name,
//     password: process.env.DB_password,
//     port: process.env.DB_port
// })

let pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

let testConnection = async () => {
    try {
        await pool.connect();
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

testConnection();

export default pool;
