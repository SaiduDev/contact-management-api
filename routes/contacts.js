import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { validateContact } from "../middlewares/validation.js";
import { editContact, getContacts, removeContact, postContact } from "../controller/contacts.js";

let contactRoutes = express.Router();

contactRoutes.get("/contacts/getAllContacts", verifyToken, getContacts);
contactRoutes.post("/contacts/submitContact",verifyToken, validateContact, postContact);
contactRoutes.put("/contacts/editContact/:id", verifyToken, validateContact, editContact);
contactRoutes.delete("/contacts/removeContact/:id", verifyToken, removeContact);

export default contactRoutes;
