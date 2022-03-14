import { cuerpoClaveAPP } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaClaveAPP = async (usuario_APP, clave_APP, destinatario, asunto) => {
  const cuerpo = cuerpoClaveAPP(usuario_APP, clave_APP);
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaClaveAPP };
