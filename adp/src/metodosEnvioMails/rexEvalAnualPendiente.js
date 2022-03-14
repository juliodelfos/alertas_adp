import { cuerpoRexEvalAnualPendiente } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaRexEvalAnualPendiente = async (
  nombre_ADP,
  apellido_ADP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoRexEvalAnualPendiente(nombre_ADP, apellido_ADP);
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaRexEvalAnualPendiente };
