import supabase from "../config/db.js";

export const getAllAsistencias = async () => {
  const { data, error } = await supabase
    .from("asistencia")
    .select("*, empleados(nombre, apellido)");
  if (error) throw error;
  return data;
};

// Función para calcular retraso en minutos
function calcularRetraso(horaNormal = "07:00:00", horaIngreso) {
  const [hnH, hnM] = horaNormal.split(":").map(Number);
  const [hiH, hiM] = horaIngreso.split(":").map(Number);

  const normalMinutos = hnH * 60 + hnM;
  const ingresoMinutos = hiH * 60 + hiM;

  const retraso = ingresoMinutos - normalMinutos;
  return retraso > 0 ? minutosATime(retraso) : "00:00:00";
}
function formatearHora(hora) {
  if (hora.length === 5 && hora.includes(":")) return hora; // ya está "HH:MM"
  const fecha = new Date(`1970-01-01T${hora}`);
  const hh = String(fecha.getHours()).padStart(2, "0");
  const mm = String(fecha.getMinutes()).padStart(2, "0");
  const ss = String(fecha.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function formatearFecha(fecha) {
  const d = new Date(fecha);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function minutosATime(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  const s = 0;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

export const registrarAsistencia = async ({ empleado_id, fecha, hora }) => {
const horaFormateada = formatearHora(hora);
console.log(horaFormateada);
const fechaFormateada = formatearFecha(fecha);
console.log(fechaFormateada);
  // Verificar si ya existe asistencia para ese día
  const { data: existente, error: fetchError } = await supabase
    .from("asistencia")
    .select("*")
    .eq("empleado_id", empleado_id)
    .eq("fecha", fechaFormateada)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 = no encontrado
    throw fetchError;
  }

  if (!existente) {
    console.log("No existe asistencia previa, creando nueva...");
    // Primer registro del día → guardamos hora_ingreso + retraso
    const retraso = calcularRetraso("07:00:00", horaFormateada);
    console.log(`Retraso calculado: ${retraso} minutos`);
    

    const { data, error } = await supabase
      .from("asistencia")
      .insert({
        empleado_id,
        fecha: fechaFormateada,
        hora_ingreso: horaFormateada,
        retraso_entrada: retraso
      });

    if (error) throw error;
    return data;
  } else {
    // Ya existe → actualizamos hora_egreso
    console.log("Ya existe asistencia previa, actualizando...");
    const { data, error } = await supabase
      .from("asistencia")
      .update({ hora_egreso: horaFormateada })
      .eq("fecha", fechaFormateada);
    //   .eq("empleado_idxistente.id);

    if (error) throw error;
    return data;
  }
};