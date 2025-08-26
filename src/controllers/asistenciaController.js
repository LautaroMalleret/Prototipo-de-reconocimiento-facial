import { getAllAsistencias } from "../services/asistenciaService.js";

export const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await getAllAsistencias();
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};