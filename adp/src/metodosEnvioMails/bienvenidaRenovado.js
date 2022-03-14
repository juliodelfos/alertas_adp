import { cuerpoBienvenidaRenovado } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaBienvenidaRenovado = async (
  nombre_ADP_corto,
  cargo_ADP,
  encargado,
  mail_encargado,
  usuario_APP,
  clave_APP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoBienvenidaRenovado(
    nombre_ADP_corto,
    cargo_ADP,
    encargado,
    mail_encargado,
    usuario_APP,
    clave_APP
  );
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaBienvenidaRenovado };
