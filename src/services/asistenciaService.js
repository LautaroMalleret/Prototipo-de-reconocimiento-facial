import supabase from "../config/db.js";

export const getAllAsistencias = async () => {
  const { data, error } = await supabase
    .from("asistencia")
    .select("*, empleados(nombre, apellido)");
  if (error) throw error;
  return data;
};