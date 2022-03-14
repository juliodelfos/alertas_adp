import { cuerpoEncuestaPercepcion } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaEncuestaPercepcion = async (
  nombre_ADP,
  apellido_ADP,
  cargo_ADP,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoEncuestaPercepcion(nombre_ADP, apellido_ADP, cargo_ADP);
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaEncuestaPercepcion };
