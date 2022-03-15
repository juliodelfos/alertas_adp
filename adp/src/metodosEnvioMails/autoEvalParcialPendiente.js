import { cuerpoAutoEvalParcialPendiente } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAutoEvalParcialPendiente = (nombre_ADP, destinatario, asunto) => {
  const cuerpo = cuerpoAutoEvalParcialPendiente(nombre_ADP);
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaAutoEvalParcialPendiente };
