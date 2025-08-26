import { getAllEmpleados } from "../services/empleadoService.js";

export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await getAllEmpleados();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};