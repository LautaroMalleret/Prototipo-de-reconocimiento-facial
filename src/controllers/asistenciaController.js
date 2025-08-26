import { getAllAsistencias, registrarAsistencia } from "../services/asistenciaService.js";

export const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await getAllAsistencias();
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const nuevaAsistencia = async (req, res) => {
  try {
    const { empleado_id, fecha, hora } = req.body;

    if (!empleado_id || !fecha || !hora) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const asistencia = await registrarAsistencia({ empleado_id, fecha, hora });
    res.status(201).json({ message: "Asistencia registrada", asistencia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};