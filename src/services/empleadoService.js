import supabase from "../config/db.js";

export const getAllEmpleados = async () => {
  const { data, error } = await supabase.from("empleados").select("*");
  if (error) throw error;
  return data;
};