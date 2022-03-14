import { cuerpoEncuestaCierre } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaEncuestaCierre = async (nombre_ADP, destinatario, asunto) => {
  const cuerpo = cuerpoEncuestaCierre(nombre_ADP);
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaEncuestaCierre };
