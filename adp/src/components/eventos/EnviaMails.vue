<template>
  <b-container class="py-4">
    <div>
      <h1 class="fs-3 mb-4 text-center">
        Envío de correo que informa evaluación mensual
      </h1>
      <div class="mb-3">
        <p>
          El listado a continuación muestra los ADP a evaluarse durante el mes
          en curso.
        </p>
        <p>
          Cada correo enviado sale con una diferencia de 1 segundo entre ellos,
          por lo que 60 correos tomaría 1 minuto.
          <b
            >No cerrar la ventana hasta recibir confirmación de envío de todos
            los correos.</b
          >
        </p>
        <p>
          Para el mes {{ this.mes }} del año {{ this.ano }}, deben evaluarse
          {{ this.adpsDeEsteMes.length }} ADPs.
        </p>
      </div>
    </div>

    <div>
      <b-table
        responsive
        striped
        hover
        :items="adpsDeEsteMes"
        :fields="fields"
      ></b-table>
      <div class="text-center" v-show="adpsDeEsteMes.length > 0">
        <b-button variant="danger" class="mx-1" @click="enviarCorreosDelMes"
          >Enviar</b-button
        >
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import emailjs from "emailjs-com";
import Vue from "vue";
import axios from "axios";

export default {
  name: "EnviaMails",

  data() {
    return {
      concurso: "",
      mes: "",
      ano: "",
      fechaActual: "",
      destinatarios: [],
      adpsDeEsteMes: [],
      fields: [
        {
          key: "concurso",
          sortable: true,
        },
        {
          key: "nombre_corregido",
          sortable: true,
          label: "Nombre",
          formatter: (value, key, item) => {
            return value ? value + " " + item.apellido_corregido : "No";
          },
        },
        {
          key: "fecha_nombramiento_renovacion",
          sortable: true,
          label: "Fecha nombramiento/renovación",
          formatter: (value, key, item) => {
            return value
              ? value.split("T00:00:00.000Z")[0].split("-").join(`/`)
              : "No";
          },
        },
        {
          key: "eval_anual_inicio",
          sortable: true,
          label: "Fecha inicio evaluación",
          formatter: (value, key, item) => {
            return value
              ? value.split("T00:00:00.000Z")[0].split("-").join(`/`)
              : "Nombrado este año";
          },
        },
        {
          key: "mail",
          sortable: true,
          label: "Correo ADP",
        },
        {
          key: "mail_contraparte_cd",
          sortable: true,
          label: "Correo Contraparte",
        },
      ],
    };
  },
  methods: {
    solicitaMes() {
      return prompt(`¿Qué mes corresponde la alerta?`, `Ej. diciembre`);
    },
    enviaCorreoPorEmailJS(mes, indice) {
      const formateaFecha = (fecha) =>
        fecha.split("T00:00:00.000Z")[0].split("-");
      const fechaInicio = () =>
        formateaFecha(this.adps[indice].eval_anual_inicio);
      const fechaEval = () => formateaFecha(this.adps[indice].eval_anual_auto);
      const fechaRetro = () =>
        formateaFecha(this.adps[indice].eval_anual_retro);
      const fechaRex = () => formateaFecha(this.adps[indice].eval_anual_rex);

      let parametros = {
        nombre_ADP: this.adps[indice].nombre_corregido,
        apellido_ADP: this.adps[indice].apellido_corregido,
        mes: mes,
        cargo: this.adps[indice].cargo,
        encargado: this.adps[indice].encargado,
        inicio: `${fechaInicio(this.adps[indice])[2]}/${
          fechaInicio(this.adps[indice])[1]
        }/${this.ano}`,
        autoeval: `${fechaEval(this.adps[indice])[2]}/${
          fechaEval(this.adps[indice])[1]
        }/${this.ano}`,
        retro: `${fechaRetro(this.adps[indice])[2]}/${
          fechaRetro(this.adps[indice])[1]
        }/${this.ano}`,
        rex: `${fechaRex(this.adps[indice])[2]}/${
          fechaRex(this.adps[indice])[1]
        }/${this.ano}`,
        mail: this.adps[indice].mail_contraparte_eval,
        mail_encargado: this.adps[indice].encargado_mail,
        // Sólo para pruebas //
        // mail: "yerson.o.b@gmail.com",
        // mail_encargado: "yers.on.ob@gmail.com",
      };

      emailjs
        .send(
          "desarrolloadp",
          "evaluacion_mensual",
          parametros,
          "user_j03eIIBx2tfg0roipyWbX"
        )
        .then(
          ({ text }) => console.log(text),
          ({ text }) => console.log(text)
        );

      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
        data: [
          [
            `Alerta evaluación mensual ${mes}`,
            this.adps[indice].concurso,
            new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString(),
            this.adps[indice].mail_contraparte_cd,
            // "yersonob@gmail.com",
          ],
        ],
      })
        .then(({ data }) => console.log(data))
        .catch((error) => console.log(error));
    },
    ADPsAEvaluarseMesEnCurso() {
      let ADPqueDebenEvaluarseEsteMes = this.adps
        .filter(
          ({ eval_anual_inicio, mail, fecha_nombramiento_renovacion }) =>
            eval_anual_inicio.split("T00:00:00.000Z")[0].split("-")[1] ===
              this.mes &&
            fecha_nombramiento_renovacion
              .split("T00:00:00.000Z")[0]
              .split("-")[0] <= this.ano &&
            mail !== "null"
        )
        .filter(
          ({ servicio, nivel }) =>
            !(servicio.includes("Local") && nivel == "I") &&
            !(servicio == "Servicio Electoral" && nivel == "I")
        )
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.concurso === value.concurso)
        );
      this.adpsDeEsteMes = ADPqueDebenEvaluarseEsteMes;
    },
    enviarCorreosDelMes() {
      let mes = this.solicitaMes();
      this.adpsDeEsteMes.forEach(({ indice }, i) => {
        setTimeout(() => {
          this.enviaCorreoPorEmailJS(mes, indice);
        }, i * 1000);
      });
      Vue.$toast.success("Correo enviado y registrado en planilla", {
        queue: true,
      });
    },
  },
  computed: {
    ...mapState(["adps"]),
    mesActual() {
      const mesActual = new Date().toLocaleDateString().split("/")[1];
      return `0${mesActual}`;
    },
    anoActual() {
      const anoActual = new Date().toLocaleDateString().split("/")[2];
      return anoActual;
    },
    formateaFecha() {
      const format = (date, locale, options) =>
        new Intl.DateTimeFormat(locale, options).format(date);
      const now = new Date();
      return format(now, "es", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  mounted() {
    this.mes = this.mesActual;
    this.ano = this.anoActual;
    this.fechaActual = this.formateaFecha;
    this.ADPsAEvaluarseMesEnCurso();
  },
};
</script>

<style>
</style>