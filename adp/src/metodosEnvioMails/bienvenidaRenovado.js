import { cuerpoBienvenidaRenovado } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaBienvenidaRenovado = (
  nombre_ADP_corto,
  encargado,
  usuario_APP,
  clave_APP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoBienvenidaRenovado(
    nombre_ADP_corto,
    cargo_ADP,
    encargado,
    usuario_APP,
    clave_APP
  );
  enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
  return true;
};

export { enviaBienvenidaRenovado };
