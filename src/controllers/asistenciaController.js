import {
  getAllAsistencias,
  registrarAsistencia,
  getAllLlegadasTarde,
  getAllFaltas,
  getTiempoDeRetrasoPorFecha,
} from "../services/asistenciaService.js";

// Controlador para obtener todas las asistencias
export const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await getAllAsistencias();
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para registrar una nueva asistencia
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

// Controlador para obtener todas las llegadas tardes
export const getLlegadasTarde = async (req, res) => {
  try {
    const asistenciasTarde = await getAllLlegadasTarde();
    res.json(asistenciasTarde);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFaltas = async (req, res) => {
  try {
    const faltas = await getAllFaltas();
    res.json(faltas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener el timepo total de retraso de los empleados por fecha
export const getTiempoDeRetraso = async (req, res) => {
  try {
    const timepoDeRetraso = await getTiempoDeRetrasoPorFecha();
    res.json(timepoDeRetraso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};
