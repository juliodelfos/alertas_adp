<template>
  <section id="tabla">
    <b-table
      striped
      hover
      :items="filtraPorConcurso"
      v-if="filtraPorConcurso.length > 0"
      small
    ></b-table>
    <b-table striped hover :items="sinRegistros" v-else small></b-table>
  </section>
</template>

<script>
// import axios from "axios";
import firebase from "firebase";

export default {
  name: "UltimosCorreos",
  data() {
    return {
      items: [],
      sinRegistros: [
        { Tipo: "S/R", Concurso: "S/R", Fecha: "S/R", Destinatario: "S/R" },
      ],
    };
  },
  methods: {
    leeAlertas() {
      const db = firebase.firestore();
      db.collection("alertasEnviadas")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.items.push({
              tipo: doc.data().tipo,
              concurso: doc.data().concurso,
              fecha: doc.data().fecha,
              destinatario: doc.data().destinatario,
            });
          });
          return alertas;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
  computed: {
    filtraPorConcurso() {
      const numeroConcurso = this.concurso;
      return this.items.filter((c) => c.concurso == numeroConcurso);
    },
  },
  mounted() {
    // this.leeAlertas();
  },
  props: {
    concurso: { type: Number, required: true },
  },
};
</script>

<style scoped>
</style>