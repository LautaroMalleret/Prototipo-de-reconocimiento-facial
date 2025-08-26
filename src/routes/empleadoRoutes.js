import express from "express";
import { obtenerEmpleados } from "../controllers/empleadoController.js";

const router = express.Router();

router.get("/", obtenerEmpleados);

export default router;