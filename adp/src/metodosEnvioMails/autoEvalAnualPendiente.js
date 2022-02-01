import { cuerpoAutoEvalAnualPendiente } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAutoEvalAnualPendiente = (nombre_ADP, destinatario, asunto) => {
  const cuerpo = cuerpoAutoEvalAnualPendiente(nombre_ADP);
  enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
  return true;
};

export { enviaAutoEvalAnualPendiente };
