import express from "express";
import { obtenerCumplimientos, obtenerRendimiento } from "../controllers/produccionController.js";
const router = express.Router();

router.get("/cumplimiento/:tipo", obtenerCumplimientos);
router.get("/rendimiento/:tipo", obtenerRendimiento);


export default router;