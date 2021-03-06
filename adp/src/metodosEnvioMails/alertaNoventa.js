import { cuerpoAlertaNoventa } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAlertaNoventa = (
  nombre_ADP,
  apellido_ADP,
  estado_cd,
  suscripcion_ADP,
  anadir_suscripcion,
  comunicacion_ADP,
  anadir_comunicacion,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoAlertaNoventa(
    nombre_ADP,
    apellido_ADP,
    estado_cd,
    suscripcion_ADP,
    anadir_suscripcion,
    comunicacion_ADP,
    anadir_comunicacion
  );
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaAlertaNoventa };
