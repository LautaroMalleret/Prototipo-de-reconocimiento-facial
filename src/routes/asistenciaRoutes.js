import express from "express";
import { obtenerAsistencias, nuevaAsistencia } from "../controllers/asistenciaController.js";

const router = express.Router();

router.get("/", obtenerAsistencias);
router.post("/", nuevaAsistencia);

export default router;