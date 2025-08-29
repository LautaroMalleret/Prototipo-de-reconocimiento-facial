import supabase from "../config/db.js";

// Función para obtener todas las asistencias con datos del empleado
export const getAllAsistencias = async () => {
  const { data, error } = await supabase
    .from("asistencia")
    .select("*, empleados(nombre, apellido)");
  if (error) throw error;
  return data;
};

// Función para obtener todas las llegadas tardes
export const getAllLlegadasTarde = async () => {
  const { data, error } = await supabase
    .from("asistencia")
    .select("*, empleados(nombre, apellido)")
    .neq("retraso_entrada", "00:00:00");
  if (error) throw error;
  return data;
};

// Función para registrar o actualizar asistencia
export const registrarAsistencia = async ({ empleado_id, fecha, hora }) => {
  const { data: turnoData, error: turnoError } = await supabase
    .from("empleados")
    .select("turno")
    .eq("_id", empleado_id)
    .single();

  if (turnoError) throw turnoError;
  const turno = turnoData.turno;

  const horaFormateada = formatearHora(hora);
  let fechaFormateada = formatearFecha(fecha, 0);

  // Si es turno noche y la hora < 12:00, la fecha corresponde al día anterior
  if (turno === "noche" && horaFormateada < "12:00:00") {
    fechaFormateada = formatearFecha(fecha, 1);
  }

  // Verificar si ya existe asistencia
  const { data: existente, error: fetchError } = await supabase
    .from("asistencia")
    .select("*")
    .eq("empleado_id", empleado_id)
    .eq("fecha", fechaFormateada)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError;
  }

  if (!existente) {
    console.log("No existe asistencia previa, creando nueva...");

    const retraso = calcularRetraso(turno, horaFormateada);

    const { data, error } = await supabase.from("asistencia").insert({
      empleado_id,
      fecha: fechaFormateada,
      hora_ingreso: horaFormateada,
      retraso_entrada: retraso,
    });

    if (error) throw error;
    return data;
  } else {
    console.log("Ya existe asistencia previa, actualizando...");
    console.log("hora de salida: " + horaFormateada);
    const { data, error } = await supabase
      .from("asistencia")
      .update({ hora_egreso: horaFormateada })
      .eq("empleado_id", existente.empleado_id); // importante usar el id del registro existente

    if (error) throw error;
    return data;
  }
};

// Función para calcular retraso en minutos dependiendo el turno del empleado
function calcularRetraso(turno, horaIngreso) {
  var horaNormal = "";
  if ((turno = "mañana")) {
    horaNormal = "06:00:00";
  }
  if ((turno = "tarde")) {
    horaNormal = "14:00:00";
  }
  if ((turno = "noche")) {
    horaNormal = "22:00:00";
  }
  const [hnH, hnM] = horaNormal.split(":").map(Number);
  const [hiH, hiM] = horaIngreso.split(":").map(Number);

  const normalMinutos = hnH * 60 + hnM;
  const ingresoMinutos = hiH * 60 + hiM;

  const retraso = ingresoMinutos - normalMinutos;
  return retraso > 0 ? minutosATime(retraso) : "00:00:00";
}

// Formatea una hora "H:M:S" o "H:M" a "HH:MM:SS"
function formatearHora(hora) {
  if (hora.length === 5 && hora.includes(":")) return hora; // ya está "HH:MM"
  const fecha = new Date(`1970-01-01T${hora}`);
  const hh = String(fecha.getHours()).padStart(2, "0");
  const mm = String(fecha.getMinutes()).padStart(2, "0");
  const ss = String(fecha.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

// Formatea una fecha "YYYY-MM-DD" y ajusta si es turno noche
function formatearFecha(fecha, esNoche) {
  const newfecha = new Date(fecha);
  if (esNoche) {
    newfecha.setDate(newfecha.getDate() - 1); // acá sí restamos un día
  }
  const yyyy = newfecha.getFullYear();
  const mm = String(newfecha.getMonth() + 1).padStart(2, "0");
  const dd = String(newfecha.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Convierte minutos a formato "HH:MM:SS"
function minutosATime(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  const s = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
}
