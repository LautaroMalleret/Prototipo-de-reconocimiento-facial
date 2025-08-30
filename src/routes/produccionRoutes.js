import express from "express";
import { obtenerCumplimientos } from "../controllers/produccionController.js";
const router = express.Router();

router.get("/cumplimiento/:tipo", obtenerCumplimientos);


export default router;