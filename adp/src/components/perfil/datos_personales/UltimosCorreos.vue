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
      try {
        const alertas = await db
          .collection("alertasADPs")
          .where("concurso", "==", this.concurso).get();

        if (!alertas.empty) {
          const snapshot = alertas.docs[0];
          const data = snapshot.data().alertas;
          this.alertas = data;
        } else {
          console.log("No hay alertas registradas");
        }

        return alertas;
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
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
