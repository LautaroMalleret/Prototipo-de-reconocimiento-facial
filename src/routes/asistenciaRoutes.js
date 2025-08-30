import express from "express";
import { obtenerAsistencias, nuevaAsistencia, getLlegadasTarde, getFaltas, getTiempoDeRetraso } from "../controllers/asistenciaController.js";

const router = express.Router();

router.get("/", obtenerAsistencias);
router.post("/", nuevaAsistencia);
router.get("/tarde", getLlegadasTarde);
router.get("/faltas", getFaltas);
router.get("/tiempoDeRetraso", getTiempoDeRetraso);

export default router;