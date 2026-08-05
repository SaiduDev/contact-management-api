import express from "express";
import { signup, login, getUserProfile, updateProfile } from "../controller/users.js";
import { registrationValidation, loginValidation, updateProfileValidation } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/auth.js";
import { loginLimit } from "../middlewares/ratelimiter.js";
let userRoutes = express.Router();

userRoutes.get("/users/profile", verifyToken, getUserProfile);
userRoutes.post("/auth/signup", loginLimit, registrationValidation, signup);
userRoutes.post("/auth/login",loginLimit, loginValidation, login);
userRoutes.put("/users/updateProfile", verifyToken, updateProfileValidation, updateProfile);
export  default  userRoutes;