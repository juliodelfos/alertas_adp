<template>
  <section id="tabla">
    <b-table
      striped
      hover
      :items="alertas"
      small
      v-show="alertas.length > 0"
    ></b-table>
  </section>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";

export default {
  name: "UltimosCorreos",
  data() {
    return {
      alertas: [],
    };
  },
  methods: {
    async leeAlertas() {
      const db = firebase.firestore();
      const alertas = db.collection("alertasADPs").doc(this.concursoToText);

      alertas
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.alertas = doc.data().alertas;
          } else {
            Vue.$toast.info(`ADP sin alertas registradas`);
          }
        })
        .catch((error) => Vue.$toast.warning(`No se pudieron leer las alertas porque: ${error}`));
    },
  },
  computed: {
    concursoToText() {
      return `${this.concurso}`;
    },
  },
  mounted() {
    this.leeAlertas();
  },
  props: {
    concurso: { type: Number, required: true },
  },
};
</script>
