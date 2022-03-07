import Vue from "vue";
import firebase from "firebase";

const fechaYHora = () =>
  new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

const creaDocumentoEnDBCierre = (tipo, concurso, destinatario) => {
  const db = firebase.firestore();
  db.collection("alertasEnviadas")
    .add({
      tipo: tipo,
      concurso: concurso,
      fecha: fechaYHora(),
      destinatario: destinatario,
    })
    .then(() => {
      Vue.$toast.open({
        message: "Enviado. Click aquí para abrir planilla de registro",
        type: "success",
        duration: 7000,
        pauseOnHover: true,
        onClick: () => {
          window.open(
            "https://docs.google.com/spreadsheets/d/11TB7XSCVJMDTmRbU720JmspHhJj2gKHiYLFcltxciOA/edit#gid=1953257145",
            "_blank"
          );
        },
      });
    })
    .catch((error) =>
      Vue.$toast.warning("No se registró correo en planilla por: " + error)
    );
};

export { creaDocumentoEnDBCierre };
