import e from "express";
import supabase from "../config/db.js";

// Función para obtener todos los empleados
export const getAllIncidencia = async () => {
  const { data, error } = await supabase
  .from("incidencias")
  .select("*")
  .order("fecha", { descending: true });
  if (error) throw error;
  return data;
};

// Función para crear un nuevo empleado
export const crearIncidencia = async ({ fecha, hora, imagen }) => {
  const { data, error } = await supabase.from("incidencias").insert([
    { fecha, hora, imagen }
  ]);
  if (error) throw error;
  return data;
}
