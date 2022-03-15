import { cuerpoClaveSICDE } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaClaveSICDE = (usuario_SICDE, clave_SICDE, destinatario, asunto) => {
  const cuerpo = cuerpoClaveSICDE(usuario_SICDE, clave_SICDE);
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaClaveSICDE };
