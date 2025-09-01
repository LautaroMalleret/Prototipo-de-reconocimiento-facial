import express from "express";
import { obtenerIncidencia, nuevaIncidencia } from "../controllers/incidenciaController.js";

const router = express.Router();

router.get("/", obtenerIncidencia);
router.post("/", nuevaIncidencia);


export default router;