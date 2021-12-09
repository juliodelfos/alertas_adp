<template>
  <div>
    <input type="text" v-model="concurso" />
    <b-button variant="primary" @click="anadeADPcomoDestinatario(concurso)"
      >Añadir</b-button
    >
    <div>
      <!-- <pre>{{ destinatarios }}</pre> -->
      <b-table striped hover :items="destinatarios"></b-table>
      <b-button variant="dark" @click="recorreArregloEnviaMail"
        >Enviar</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import emailjs from "emailjs-com";

export default {
  name: "EnviaMails",

  data() {
    return {
      concurso: "",
      destinatarios: [],
      adptmail: "",
      adptconcurso: "",

      //   adps: [
      //     {
      //       concurso: "2113",
      //       ministerio: "Ministerio de Educación",
      //       servicio: "Agencia de Calidad de la Educación",
      //       region: "Región Metropolitana de Santiago",
      //       nombre: "JUAN RAFAEL",
      //       apellido: "BRAVO MIRANDA",
      //       mail: "yersonob@gmail.com",
      //       cargo: "Jefe/a División de Evaluación de Logros de Aprendizaje",
      //       nivel: "II",
      //       fecha_nombramiento: "2013-10-01T00:00:00.000Z",
      //       estado_adp: "Renovado (tercer periodo)",
      //       sexo: "M",
      //       estado_cd: "Suscrito",
      //       rut: "10396228-5",
      //       alerta0: "null",
      //       indice: 0,
      //       nombre_corregido: "Juan Rafael",
      //       apellido_corregido: "Bravo Miranda",
      //     },
      //     {
      //       concurso: "2040",
      //       ministerio: "Ministerio de Educación",
      //       servicio: "Superintendencia de Educación",
      //       region: "Región de Atacama",
      //       nombre: "MARGGIE SOLANGE",
      //       apellido: "MUÑOZ VERÓN",
      //       mail: "yerson.o.b@gmail.com",
      //       cargo: "Director/a Regional Atacama",
      //       nivel: "II",
      //       fecha_nombramiento: "2013-10-01T00:00:00.000Z",
      //       estado_adp: "Renovado (tercer periodo)",
      //       sexo: "F",
      //       estado_cd: "Suscrito",
      //       rut: "10934438-9",
      //       alerta0: "null",
      //       indice: 1,
      //       nombre_corregido: "Marggie Solange",
      //       apellido_corregido: "Muñoz Verón",
      //       alerta_cero: "No",
      //     },
      //   ],
    };
  },
  methods: {
    anadeADPcomoDestinatario(concurso) {
      if (this.concurso.length > 5) {
        const arregloApartirDeVariosConcursos = concurso.split(" ");
        arregloApartirDeVariosConcursos.forEach((adp) => {
          const datosCompletos = this.adps.find((c) => c.concurso == adp);
          datosCompletos
            ? this.destinatarios.push(datosCompletos)
            : console.log("No encontrado");
        });
      } else {
        const datosCompletos = this.adps.find((c) => c.concurso == concurso);
        datosCompletos
          ? this.destinatarios.push(datosCompletos)
          : console.log("No encontrado");
      }
      this.concurso = "";
    },
    recorreArregloEnviaMail() {
      this.destinatarios.forEach((adp, i) => {
        setTimeout(() => {
          this.enviaCorreoPorEmailJS(i);
        }, i * 1000);
      });
    },
    confirmar(concurso, mail, evento) {
      return `<a href="http://localhost:8080/exito?c=${concurso}&mail=${mail}&evento=${evento}" target="_blank">Aquí</a>`;
    },
    enviaCorreoPorEmailJS(i) {
      let parametros = {
        nombre_ADP: this.adps[i].nombre_corregido,
        apellido_ADP: this.adps[i].nombre_corregido,
        concurso: this.adps[i].concurso,
        // Sólo para pruebas //
        mail: "yersonob@gmail.com",
        // mail: this.adps[i].mail,
        evento: "Evento de prueba",
        confirma: this.confirmar(
          this.adps[i].concurso,
          "yersonob@gmail.com",
          "Evento de prueba"
        ),
      };
      emailjs
        .send(
          "desarrolloadp",
          "evento",
          parametros,
          "user_j03eIIBx2tfg0roipyWbX"
        )
        .then(
          ({ text }) => console.log(text),
          ({ text }) => console.log(text)
        );
    },
  },
  computed: {
    ...mapState(["adps"]),
  },
};
</script>

<style>
</style>