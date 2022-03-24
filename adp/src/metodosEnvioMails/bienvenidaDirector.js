import { cuerpoBienvenidaDirector } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaBienvenidaDirector = (
  nombre_ADP_corto,
  encargado,
  mail_encargado,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoBienvenidaDirector(
    nombre_ADP_corto,
    encargado,
    mail_encargado,
  );
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaBienvenidaDirector };
