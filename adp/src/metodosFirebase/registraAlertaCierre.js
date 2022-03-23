import Vue from "vue";
import firebase from "firebase";

const fechaYHora = () =>
  new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

const creaDocumentoEnDBCierre = (tipo, concurso, destinatario) => {
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
      Vue.$toast.open({
        message: "Click aquí para abrir planilla de registro",
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
    } else {
      // En caso de que no exista el documento, se crea como array de objetos
      db.collection("alertasADPs")
        .doc(concurso.toString())
        .set({
          concurso: +concurso,
          alertas: [
            {
              tipo: tipo,
              destinatario: destinatario,
              fecha: fechaYHora(),
            },
          ],
        })
        .then(() =>
          Vue.$toast.open({
            message: "Click aquí para abrir planilla de registro",
            type: "success",
            duration: 7000,
            pauseOnHover: true,
            onClick: () => {
              window.open(
                "https://docs.google.com/spreadsheets/d/11TB7XSCVJMDTmRbU720JmspHhJj2gKHiYLFcltxciOA/edit#gid=1953257145",
                "_blank"
              );
            },
          })
        )
        .catch((error) =>
          Vue.$toast.warning(`No se registró correo en planilla por: ${error}`)
        );
    }
  });
};

export { creaDocumentoEnDBCierre };
