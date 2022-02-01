import { cuerpoAutoEvalParcialPendiente } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAutoEvalParcialPendiente = (nombre_ADP, destinatario, asunto) => {
  const cuerpo = cuerpoAutoEvalParcialPendiente(nombre_ADP);
  enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
  return true;
};

export { enviaAutoEvalParcialPendiente };
