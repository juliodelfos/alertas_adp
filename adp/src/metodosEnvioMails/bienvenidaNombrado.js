import { cuerpoBienvenidaNombrado } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaBienvenidaNombrado = async (
  nombre_ADP_corto,
  encargado,
  mail_encargado,
  usuario_APP,
  clave_APP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoBienvenidaNombrado(
    nombre_ADP_corto,
    encargado,
    mail_encargado,
    usuario_APP,
    clave_APP
  );
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaBienvenidaNombrado };
