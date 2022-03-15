import { cuerpoAlertaCeroRenovado } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAlertaCeroRenovado = (
  nombre_ADP,
  apellido_ADP,
  cargo_ADP,
  nombramiento_ADP,
  anadir_nombramiento,
  suscripcion_ADP,
  anadir_suscripcion,
  comunicacion_ADP,
  anadir_comunicacion,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoAlertaCeroRenovado(
    nombre_ADP,
    apellido_ADP,
    cargo_ADP,
    nombramiento_ADP,
    anadir_nombramiento,
    suscripcion_ADP,
    anadir_suscripcion,
    comunicacion_ADP,
    anadir_comunicacion
  );
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaAlertaCeroRenovado };
