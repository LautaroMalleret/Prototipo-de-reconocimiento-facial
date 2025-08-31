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

export const getAllEstadisticas = async (tipo) => {
  const { data: estadisticas, error: estadisticasError } = await supabase
  .from("produccion")
  .select("fecha, disponibilidad, cumplimiento, calidad")
  .eq("producto", tipo)
  .order("fecha", { ascending: true });
  return estadisticas;
}

export const getAllOee = async () => {
  const { data, error } = await supabase
  .from("produccion")
  .select("fecha, producto, oee")
  .order("fecha", { ascending: true });

if (error) throw error;

// Pivot manual en Node
const resultado = [];

data.forEach(row => {
  let fechaRow = resultado.find(r => r.fecha === row.fecha);
  if (!fechaRow) {
    fechaRow = { fecha: row.fecha };
    resultado.push(fechaRow);
  }
  fechaRow[row.producto] = row.oee;
});
return resultado;
}