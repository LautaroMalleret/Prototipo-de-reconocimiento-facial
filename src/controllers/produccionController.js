import { getAllCumplimientos, getAllRendimientos, getAllEstadisticas } from "../services/produccionService.js";

export const obtenerCumplimientos = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    // console.log(tipo);
    const cumplimientos = await getAllCumplimientos(tipo);
    // console.log(cumplimientos);
    res.json(cumplimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerRendimiento = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    // console.log(tipo);
    const rendimiento = await getAllRendimientos(tipo);
    // console.log(cumplimientos);
    res.json(rendimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerEstadisticas = async (req, res) => {
  try{ 
    const tipo = req.params.tipo;
    const estadisticas = await getAllEstadisticas(tipo);
    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  }