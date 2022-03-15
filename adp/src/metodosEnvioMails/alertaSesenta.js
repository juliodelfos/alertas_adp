import { cuerpoAlertaSesenta } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAlertaSesenta = (
  nombre_ADP,
  apellido_ADP,
  estado_cd,
  suscripcion_ADP,
  anadir_suscripcion,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoAlertaSesenta(
    nombre_ADP,
    apellido_ADP,
    estado_cd,
    suscripcion_ADP,
    anadir_suscripcion,
  );
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaAlertaSesenta };
