import express from "express";
import { obtenerEmpleados, nuevoEmpleado, obtenerUltimoId } from "../controllers/empleadoController.js";

const router = express.Router();

router.get("/", obtenerEmpleados);
router.post("/", nuevoEmpleado);
router.get("/ultimoId", obtenerUltimoId);



export default router;