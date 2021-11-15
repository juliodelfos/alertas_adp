<template>
  <section id="tabla">
    <b-table striped hover :items="filtraPorConcurso" v-if="filtraPorConcurso.length > 0" small ></b-table>
    <b-table striped hover :items="sinRegistros" v-else small></b-table>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "UltimosCorreos",
  data() {
    return {
      items: [],
      sinRegistros: [{ Tipo: "S/R", Concurso: "S/R", Fecha: "S/R", Destinatario: "S/R" }],
    };
  },
  methods: {
    ultimosCorreos() {
      axios({
        method: "get",
        url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
      })
        .then((response) => (this.items = response.data.data))
        .catch((error) => console.log(error));
    },
  },
  computed: {
    filtraPorConcurso() {
      const numeroConcurso = this.concurso;
      return this.items.filter((c) => c.concurso == numeroConcurso);
    },
  },
  created() {
    this.ultimosCorreos();
  },
  props: {
    concurso: { type: Number, required: true },
  },
};
</script>

<style scoped>
</style>