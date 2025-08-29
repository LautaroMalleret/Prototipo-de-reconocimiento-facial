import { getAllEmpleados, crearEmpleado } from "../services/empleadoService.js";

// Controlador para obtener todos los empleados
export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await getAllEmpleados();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear un nuevo empleado
export const nuevoEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, area, rol, turno } = req.body;

    if (!nombre || !apellido || !area || !rol || !turno) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Aquí deberías llamar a una función del servicio para crear un nuevo empleado
    const empleado = await crearEmpleado({ nombre, apellido, area, rol, turno });

    res.status(201).json({ message: "Empleado creado" /*, empleado */ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}