import { cuerpoEncuestaPercepcion } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaEncuestaPercepcion = (
  nombre_ADP,
  apellido_ADP,
  cargo_ADP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoEncuestaPercepcion(nombre_ADP, apellido_ADP, cargo_ADP);
  enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
  return true;
};

export { enviaEncuestaPercepcion };
