import { cuerpoAutoEvalAnualPendiente } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaAutoEvalAnualPendiente = async (
  nombre_ADP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoAutoEvalAnualPendiente(nombre_ADP);
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaAutoEvalAnualPendiente };
