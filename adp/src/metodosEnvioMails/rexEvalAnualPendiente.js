import { cuerpoRexEvalAnualPendiente } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaRexEvalAnualPendiente = (
  nombre_ADP,
  apellido_ADP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoRexEvalAnualPendiente(nombre_ADP, apellido_ADP);
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaRexEvalAnualPendiente };
