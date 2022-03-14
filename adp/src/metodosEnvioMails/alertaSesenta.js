import { cuerpoAlertaSesenta } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAlertaSesenta = async (
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
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaAlertaSesenta };
