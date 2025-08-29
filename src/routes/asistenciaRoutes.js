import express from "express";
import { obtenerAsistencias, nuevaAsistencia, getLlegadasTarde } from "../controllers/asistenciaController.js";

const router = express.Router();

router.get("/", obtenerAsistencias);
router.post("/", nuevaAsistencia);
router.get("/tarde", getLlegadasTarde);

export default router;