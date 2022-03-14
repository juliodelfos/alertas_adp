import { Email } from "@/smtp.js";
import Vue from "vue";

const enviarCorreoPorFidelizador = async (destinatario, asunto, cuerpo) => {
  try {
    const email = Email.send({
      Host: "relay.fidelizador.com",
      Username: "sercivil.09e2cc+cl1.fidelizador.com",
      Password: "28ae46a8af1c2fbaa0bebb45e76e4da9",
      To: destinatario,
      From: "desarrolloadp@serviciocivil.cl",
      Subject: asunto,
      Body: cuerpo,
    });
    let response = await email;
    console.log(response);
    Vue.$toast.success("Alerta enviada con éxito");
  } catch (error) {
    console.log("Error" + error);
  }
};

export { enviarCorreoPorFidelizador };
