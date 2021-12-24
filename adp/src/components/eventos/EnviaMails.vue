<template>
  <b-container class="py-3">
    <h1 class="fs-4 mb-3">Envío de correo que informa evaluación mensual</h1>
    <p>
      Se puede copiar uno o varios concursos, directamente desde un Excel. En
      caso de añadir más de un concurso "a mano", separar cada uno de ellos por
      un espacio.
    </p>
    <p>
      Cada correo enviado sale con una diferencia de 1 segundo entre ellos, por
      lo que 60 correos tomaría 1 minuto.
      <b
        >No cerrar la ventana hasta recibir confirmación de envío de todos los
        correos</b
      >
    </p>
    <b-input-group prepend="Concursos" class="mt-3 mb-4">
      <b-form-input v-model="concurso"></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" @click="anadeADPcomoDestinatario(concurso)"
          >Añadir</b-button
        >
      </b-input-group-append>
    </b-input-group>

    <h1 class="fs-4 text-center mb-3" v-show="destinatarios.length > 0">
      Destinatarios
    </h1>
    <div>
      <b-table striped hover :items="destinatarios"></b-table>
      <div class="text-center" v-show="destinatarios.length > 0">
        <b-button variant="danger" class="mx-1" @click="recorreArregloEnviaMail"
          >Enviar</b-button
        >
        <b-button variant="info" class="mx-1" @click="limpiarTabla">Limpiar tabla</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import emailjs from "emailjs-com";
import Vue from "vue";

export default {
  name: "EnviaMails",

  data() {
    return {
      concurso: "",
      destinatarios: [],
    };
  },
  methods: {
    limpiarTabla() {
      this.destinatarios = [];
    },
    anadeADPcomoDestinatario(concurso) {
      // Creo arreglo a partir de los concursos añadidos
      const arregloApartirDeVariosConcursos = concurso.split(" ");
      // Recorro arreglo y compruebo que existan en mi base
      arregloApartirDeVariosConcursos.forEach((adp) => {
        const datosCompletos = this.adps.find((c) => c.concurso == adp);
        let {
          concurso,
          nombre_corregido,
          apellido_corregido,
          cargo,
          servicio,
          encargado_mail,
        } = datosCompletos;
        if (datosCompletos) {
          this.destinatarios.push({
            concurso,
            nombre_corregido,
            apellido_corregido,
            cargo,
            servicio,
            encargado_mail,
          });
        } else {
          console.log("no");
        }
      });
      this.concurso = "";
    },
    solicitaMes() {
      return prompt(`¿Qué mes corresponde la alerta?`, `Ej. diciembre`);
    },
    recorreArregloEnviaMail() {
      let mes = this.solicitaMes();
      this.destinatarios.forEach((adp, i) => {
        setTimeout(() => {
          this.enviaCorreoPorEmailJS(i, mes);
        }, i * 1000);
      });
    },
    // confirmar(concurso, mail, evento) {
    //   return `<a href="http://localhost:8080/exito?c=${concurso}&mail=${mail}&evento=${evento}" target="_blank">Aquí</a>`;
    // },
    enviaCorreoPorEmailJS(i, mes) {
      const formateaFecha = (fecha) =>
        fecha.split("T00:00:00.000Z")[0].split("-");
      const fechaInicio = (i) => formateaFecha(this.adps[i].eval_anual_inicio);
      const fechaEval = (i) => formateaFecha(this.adps[i].eval_anual_auto);
      const fechaRetro = (i) => formateaFecha(this.adps[i].eval_anual_retro);
      const fechaRex = (i) => formateaFecha(this.adps[i].eval_anual_rex);

      let parametros = {
        nombre_ADP: this.adps[i].nombre_corregido,
        apellido_ADP: this.adps[i].apellido_corregido,
        mes: mes,
        cargo: this.adps[i].cargo,
        encargado: this.adps[i].encargado,
        // mail_encargado: this.adps[i].encargado_mail,
        inicio: `${fechaInicio(i)[2]}/${fechaInicio(i)[1]}/${
          fechaInicio(i)[0]
        }`,
        autoeval: `${fechaEval(i)[2]}/${fechaEval(i)[1]}/${fechaEval(i)[0]}`,
        retro: `${fechaRetro(i)[2]}/${fechaRetro(i)[1]}/${fechaRetro(i)[0]}`,
        rex: `${fechaRex(i)[2]}/${fechaRex(i)[1]}/${fechaRex(i)[0]}`,
        // mail: this.adps[i].mail,
        // Sólo para pruebas //
        mail: "yersonob@gmail.com",
      };
      emailjs
        .send(
          "desarrolloadp",
          "evaluacion_mensual",
          parametros,
          "user_j03eIIBx2tfg0roipyWbX"
        )
        .then(
          ({ text }) =>
            Vue.$toast.success("Todas las alertas han sido enviadas"),
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