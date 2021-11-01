<template>
  <b-container class="mt-4">
    <grid
      :cols="cols"
      :rows="adps"
      :language="language"
      :search="search"
      :sort="sort"
      :pagination="pagination"
    ></grid>
  </b-container>
</template>

<script>
import Grid from "gridjs-vue";
import { html } from "gridjs";
import { mapState } from "vuex";
export default {
  name: "Table",
  components: {
    Grid,
  },
  data() {
    return {
      cols: [
        "Concurso",
        "Nombre",
        "Apellido",
        "Cargo",
        "Servicio",
        {
          name: "Indice",
          formatter: (cell) => html(`<a href="/perfil/${cell}"><button class="btn btn-primary">Detalles</button></a>`),
        },
      ],
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
        limit: 7,
        summary: true,
      },
    };
  },
  computed: {
    ...mapState(["adps"]),
  },
};
</script>