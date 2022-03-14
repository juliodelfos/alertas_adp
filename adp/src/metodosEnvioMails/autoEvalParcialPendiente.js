import { cuerpoAutoEvalParcialPendiente } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAutoEvalParcialPendiente = async (nombre_ADP, destinatario, asunto) => {
  const cuerpo = cuerpoAutoEvalParcialPendiente(nombre_ADP);
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaAutoEvalParcialPendiente };
