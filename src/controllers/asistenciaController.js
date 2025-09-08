import {
  getAllAsistencias,
  // registrarAsistencia,
  getAllLlegadasTarde,
  getAllFaltas,
  getTiempoDeRetrasoPorFecha,
  registrarIngreso,
  registrarEgreso,
  getIngresoRegistrado
} from "../services/asistenciaService.js";

//verifico si el empleado tiene un ingreso en esa fecha 
export const verificarIngreso = async (req, res) => {
  try {
    const now = new Date();
    const empleado_id = req.params.id;
    const fecha = new Date().toISOString().split('T')[0];

    const ingreso = await getIngresoRegistrado(empleado_id, fecha, now);
    // console.log(res.json(JSON.stringify(ingreso)));

    return res.status(200).json(ingreso);
  }
  catch (error){
    res.status(500).json({ error: error.message });
  }
}




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

    const asistencia = await registrarIngreso({ empleado_id, fecha, hora });
    console.log(asistencia);
    if (!asistencia){
      res.status(404).json({ error: "asistencia no registrada" });
      return;
    }
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

export const nuevoEgreso = async (req, res) => {
  try {
    const { empleado_id, fecha, hora } = req.body; 
    if (!empleado_id || !fecha || !hora) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const egreso = await registrarEgreso({ empleado_id, fecha, hora });
    if (!egreso){
      res.status(404).json({ error: "egreso no registrado" });
      return;
    }
    res.status(201).json({ message: "Egreso registrado", egreso });
  } catch (error){
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
