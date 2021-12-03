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
import { h } from "gridjs";
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
          formatter: (cell) => html(`<span>${cell}</span>`),
        },
        {
          name: "Actions",
          formatter: (cell, { _cells }) => {
            return h(
              "button",
              {
                className: "btn btn-primary",
                onClick: () => this.navega(_cells[5].data),
              },
              "Ir"
            );
          },
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
  methods: {
    navega(indice) {
      this.$router.push({ path: `/perfil/${indice}` });
    },
  },
  computed: {
    ...mapState(["adps"]),
  },
};
</script>



