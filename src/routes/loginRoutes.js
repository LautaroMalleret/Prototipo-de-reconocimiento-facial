import express from "express";
import { login } from "../controllers/loginController.js";

const router = express.Router();

// Ruta para el inicio de sesión
router.post("/", login);


export default router;