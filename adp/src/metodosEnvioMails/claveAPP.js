import { cuerpoClaveAPP } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaClaveAPP = (usuario_APP, clave_APP, destinatario, asunto) => {
  const cuerpo = cuerpoClaveAPP(usuario_APP, clave_APP);
  enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
  return true;
};

export { enviaClaveAPP };
