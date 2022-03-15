import { cuerpoEncuestaCierre } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaEncuestaCierre = (nombre_ADP, destinatario, asunto) => {
  const cuerpo = cuerpoEncuestaCierre(nombre_ADP);
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaEncuestaCierre };
