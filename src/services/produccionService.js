import supabase from "../config/db.js";


export const getAllCumplimientos = async (tipo) => {
  const { data: cumplimientos, error: cumplimientosError } = await supabase
  .from("produccion")
  .select("fecha, plan_unidades, aceptadas, rechazadas")
  .eq("producto", tipo)
  .order("fecha", { ascending: true });
// console.log(cumplimientos);
  // if (error) throw cumplimientosError;
    return cumplimientos;
}