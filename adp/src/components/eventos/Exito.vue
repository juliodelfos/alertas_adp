<template>
  <div class="text-center">
    <h1>Ya estás inscrito en</h1>
    <h1>{{ adp.evento }}</h1>
    <h3>Recibirás un correo de confirmación de tu inscripción</h3>
    <h4>Si tienes dudas escribe a desarrolloadp@serviciocivil.cl</h4>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Exito",
  data() {
    return {
      adp: {
        concurso: "",
        mail: "",
        evento: "",
      },
    };
  },
  methods: {
    // ?c=4321&mail=yersonob%40gmail.com&evento=Induccion I nivel
    analizaURL() {
      let queryString = window.location.search;
      let params = new URLSearchParams(queryString);
      this.adp.concurso = params.get("c");
      this.adp.mail = params.get("mail");
      this.adp.evento = params.get("evento");
      this.registraAlertaPlanilla();
    },
    registraAlertaPlanilla() {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/RkzZKuszROavKXTk?tabId=registros",
        data: [
          [this.adp.concurso, this.adp.mail, this.adp.evento, this.fechaYHora()],
        ],
      })
        .then(({ data }) => console.log(data))
        .catch((error) => console.log(error));
    },
    fechaYHora() {
      return (
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      );
    },
  },
  computed: {},
  mounted() {
    this.analizaURL();
  },
};
</script>

<style>
</style>