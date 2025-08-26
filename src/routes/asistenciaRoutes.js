import express from "express";
import { obtenerAsistencias } from "../controllers/asistenciaController.js";

const router = express.Router();

router.get("/", obtenerAsistencias);

export default router;