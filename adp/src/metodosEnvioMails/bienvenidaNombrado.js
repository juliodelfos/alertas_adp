import { cuerpoBienvenidaNombrado } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaBienvenidaNombrado = (
  nombre_ADP_corto,
  encargado,
  usuario_APP,
  clave_APP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoBienvenidaNombrado(
    nombre_ADP_corto,
    encargado,
    usuario_APP,
    clave_APP
  );
  enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
  return true;
};

export { enviaBienvenidaNombrado };
