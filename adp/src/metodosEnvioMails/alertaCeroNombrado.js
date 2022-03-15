import { cuerpoAlertaCero } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAlertaCeroNombrado = (
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
  const cuerpo = cuerpoAlertaCero(
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

export { enviaAlertaCeroNombrado };
