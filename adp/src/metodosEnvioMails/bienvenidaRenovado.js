import { cuerpoBienvenidaRenovado } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaBienvenidaRenovado = (
  nombre_ADP_corto,
  encargado,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoBienvenidaRenovado(nombre_ADP_corto, encargado);
  return enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaBienvenidaRenovado };
