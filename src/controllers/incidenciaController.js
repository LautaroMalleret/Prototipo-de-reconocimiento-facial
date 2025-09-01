import { getAllIncidencia, crearIncidencia } from "../services/incidenciaService.js";

// Controlador para obtener todos los empleados
export const obtenerIncidencia = async (req, res) => {
  try {
    const incidencias = await getAllIncidencia();
    res.json(incidencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear un nuevo empleado
export const nuevaIncidencia = async (req, res) => {
  try {
    const {fecha, hora, imagen } = req.body;
    if (!fecha || !hora || !imagen ) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Aquí deberías llamar a una función del servicio para crear un nuevo empleado
    const incidencia = await crearIncidencia({ fecha, hora, imagen});

    res.status(201).json({ message: "Incidencia creada", incidencia});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}