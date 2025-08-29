import express from "express";
import { obtenerEmpleados, nuevoEmpleado } from "../controllers/empleadoController.js";

const router = express.Router();

router.get("/", obtenerEmpleados);
router.post("/", nuevoEmpleado);


export default router;