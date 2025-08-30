import { getAllCumplimientos } from "../services/produccionService.js";

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