import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import contactRoutes from "./routes/contacts.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({
    origin: "https://my-phone-book-neon.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

try {
    app.use("/contacts/api", userRoutes);
    app.use("/contacts/api", contactRoutes);


    let port = process.env.PORT || 5000;
    app.listen(port, ()=>{
console.log(`Server running on port ${port}`);
    });


} catch (error) {
    console.log(error.message);
}