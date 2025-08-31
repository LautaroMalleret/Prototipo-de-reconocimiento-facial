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

export const getAllRendimientos = async (tipo) => {
  const { data: rendimientos, error: rendimientosError } = await supabase
  .from("produccion")
  .select("fecha, plan_minutos,tiempo_operativo")
  .eq("producto", tipo)
  .order("fecha", { ascending: true });
  return rendimientos;
} 