import Vue from "vue";
import firebase from "firebase";

// Genera día y hora
const fechaYHora = () =>
  new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

const creaDocumentoEnDB = (tipo, concurso, destinatario) => {
  const db = firebase.firestore();
  // Busco si existe el documento cuyo ID es el número de concurso
  const docRef = db.collection("alertasADPs").doc(concurso);

  docRef.get().then((doc) => {
    if (doc.exists) {
      // Se añade objeto a array de alertas del documento
      docRef.update({
        alertas: firebase.firestore.FieldValue.arrayUnion({
          tipo: tipo,
          destinatario: destinatario,
          fecha: fechaYHora(),
        }),
      });
      Vue.$toast.success("Alerta registrada en base de datos");
    } else {
      // En caso de que no exista el documento, se crea como array de objetos
      db.collection("alertasADPs")
        .doc(concurso.toString())
        .set({
          alertas: [
            {
              tipo: tipo,
              destinatario: destinatario,
              fecha: fechaYHora(),
            },
          ],
        })
        .then(() => Vue.$toast.success(`Alerta registrada en base de datos`))
        .catch((error) =>
          Vue.$toast.warning(`No se registró correo en planilla por: ${error}`)
        );
    }
  });
};

export { creaDocumentoEnDB };
