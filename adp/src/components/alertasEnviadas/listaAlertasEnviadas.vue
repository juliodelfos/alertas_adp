<template>
  <b-container class="my-4">
    <grid
      :cols="cols"
      :rows="alertas"
      :language="language"
      :search="search"
      :sort="sort"
      :pagination="pagination"
    ></grid>
  </b-container>
</template>

<script>
import firebase from "firebase";
import Grid from "gridjs-vue";

export default {
  name: "RegistraAlertas",
  components: {
    Grid,
  },
  data() {
    return {
      alertas: [],
      cols: ["Tipo", "Concurso", "Fecha", "Destinatario"],
      language: {
        search: {
          placeholder: "🔍 Buscar...",
        },
        pagination: {
          previous: "Previo",
          next: "Siguiente",
          showing: "Mostrando",
          results: () => "Records",
        },
      },
      search: true,
      sort: {
        enabled: true,
        selector: (cell, rowIndex, cellIndex) =>
          cellIndex === 0 ? cell.concurso : cell,
      },
      pagination: {
        enabled: true,
        limit: 20,
        summary: true,
      },
    };
  },
  methods: {
    leeAlertas() {
      const db = firebase.firestore();
      db.collection("alertasEnviadas")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.alertas.push({
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
  mounted() {
    this.leeAlertas();
  },
};
</script>

<style>
</style>