import e from "express";
import supabase from "../config/db.js";

// Función para obtener todos los empleados
export const getAllEmpleados = async () => {
  const { data, error } = await supabase.from("empleados").select("*");
  if (error) throw error;
  return data;
};

// Función para crear un nuevo empleado
export const crearEmpleado = async ({ nombre, apellido, area, rol, turno }) => {
  const { data, error } = await supabase.from("empleados").insert([
    { nombre, apellido, area, rol, turno }
  ]);
  if (error) throw error;
  return data;
}
