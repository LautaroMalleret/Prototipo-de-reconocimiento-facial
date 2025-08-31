import express from "express";
import { obtenerCumplimientos, obtenerRendimiento, obtenerEstadisticas, obtenerOeeFecha } from "../controllers/produccionController.js";
const router = express.Router();

router.get("/cumplimiento/:tipo", obtenerCumplimientos);
router.get("/rendimiento/:tipo", obtenerRendimiento);
router.get("/estadisticas/:tipo", obtenerEstadisticas)
router.get("/oee", obtenerOeeFecha)


export default router;