import { cuerpoEvaluacionesMensuales } from "@/plantillasMail.js";
import { enviarCorreoPorFidelizador } from "@/metodosEnvioMails/funcionFidelizador.js";

const enviaEvaluacionMensual = async (
  nombre_ADP,
  apellido_ADP,
  cargo,
  mes,
  inicio,
  autoeval,
  retro,
  rex,
  encargado,
  mail_encargado,
  destinatario,
  asunto
) => {
  const cuerpo = cuerpoEvaluacionesMensuales(
    nombre_ADP,
    apellido_ADP,
    cargo,
    mes,
    inicio,
    autoeval,
    retro,
    rex,
    encargado,
    mail_encargado
  );
  return await enviarCorreoPorFidelizador(destinatario, asunto, cuerpo);
};

export { enviaEvaluacionMensual };
