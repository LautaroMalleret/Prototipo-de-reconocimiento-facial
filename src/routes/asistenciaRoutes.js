import express from "express";
import { obtenerAsistencias, nuevaAsistencia, getLlegadasTarde, getFaltas, getTiempoDeRetraso, nuevoEgreso, verificarIngreso } from "../controllers/asistenciaController.js";

const router = express.Router();

router.get("/", obtenerAsistencias);
router.post("/", nuevaAsistencia);
router.post("/egreso", nuevoEgreso);
router.get("/tarde", getLlegadasTarde);
router.get("/faltas", getFaltas);
router.get("/tiempoDeRetraso", getTiempoDeRetraso);
router.get("/tieneIngreso/:id", verificarIngreso);

export default router;