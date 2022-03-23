<template>
  <b-container class="my-4">
    <b-button
      size="sm"
      variant="outline-primary"
      @click="leeAlertas"
      >Cargar correos</b-button
    >
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
      cols: ["Concurso", "Alertas"],
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
    async leeAlertas() {
      const db = firebase.firestore();
      try {
        const alertas = await db
          .collection("alertasADPs")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.alertas.push({
                concurso: doc.data().concurso,
                alertas: doc.data().alertas[0],
              });
            });
            return alertas;
          });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    },
  },
  mounted() {
    // this.leeAlertas();
  },
};
</script>

<style>
</style>