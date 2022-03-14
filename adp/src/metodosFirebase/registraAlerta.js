import Vue from "vue";
import firebase from "firebase";

const fechaYHora = () =>
  new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

const creaDocumentoEnDB = (tipo, concurso, destinatario) => {
  const db = firebase.firestore();
  db.collection("alertasEnviadas")
    .add({
      tipo: tipo,
      concurso: concurso,
      fecha: fechaYHora(),
      destinatario: destinatario,
    })
    .then(() => Vue.$toast.success("Correo registrado en planilla"))
    .catch((error) =>
      Vue.$toast.warning("No se registró correo en planilla por: " + error)
    );
};

export { creaDocumentoEnDB };
