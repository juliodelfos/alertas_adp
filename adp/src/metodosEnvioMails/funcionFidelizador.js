const enviarCorreoPorFidelizador = (destinatario, asunto, cuerpo) => {
  Email.send({
    Host: "relay.fidelizador.com",
    Username: "sercivil.09e2cc+cl1.fidelizador.com",
    Password: "28ae46a8af1c2fbaa0bebb45e76e4da9",
    To: destinatario,
    From: "desarrolloadp@serviciocivil.cl",
    Subject: asunto,
    Body: cuerpo,
  }).then((message) => console.log(message));
};

export { enviarCorreoPorFidelizador };
