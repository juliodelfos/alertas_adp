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
          por lo que 60 correos tomarían 1 minuto.
          <b
            >No cerrar la ventana hasta recibir confirmación de envío de todos
            los correos.</b
          >
        </p>
        <p>
          Para el periodo {{ this.formateaFecha }} deben evaluarse
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
import Vue from "vue";
import { enviaEvaluacionMensual } from "@/metodosEnvioMails/evalMensual.js";
import { creaDocumentoEnDB } from "@/metodosFirebase/registraAlerta.js";

export default {
  name: "EnviaMails",

  data() {
    return {
      concurso: "",
      // mes: "",
      // ano: "",
      mes_Ano: "",
      destinatarios: [],
      adpsDeEsteMes: [],
      fields: [
        {
          key: "concurso",
          sortable: true,
        },
        {
          key: "estado_adp",
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
    ADPsAEvaluarseMesEnCurso() {
      let ADPqueDebenEvaluarseEsteMes = this.adps
        .filter(
          ({ eval_anual_inicio, mail, fecha_nombramiento_renovacion }) =>
            eval_anual_inicio.split("T00:00:00.000Z")[0].split("-")[1] ===
              this.mesActual &&
            fecha_nombramiento_renovacion
              .split("T00:00:00.000Z")[0]
              .split("-")[0] <= this.anoActual &&
            mail !== "null"
        )
        .filter(
          ({ servicio, nivel }) =>
            !(servicio.includes("Local") && nivel == "I") &&
            !(servicio == "Servicio Electoral" && nivel == "I")
        )
        .filter(
          ({ fecha_nombramiento_renovacion, estado_adp }) =>
            !(
              fecha_nombramiento_renovacion
                .split("T00:00:00.000Z")[0]
                .split("-")
                .splice(0, 2)
                .sort()
                .join("/") == this.mes_Ano &&
              estado_adp == "Nombrado (primer periodo)"
            )
        )
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.concurso === value.concurso)
        );
      this.adpsDeEsteMes = ADPqueDebenEvaluarseEsteMes;
    },

    enviaMailPorFidelizador(mes, indice) {
      const formateaFecha = (fecha) =>
        fecha.split("T00:00:00.000Z")[0].split("-");
      const fechaInicio = () =>
        formateaFecha(this.adps[indice].eval_anual_inicio);
      const fechaEval = () => formateaFecha(this.adps[indice].eval_anual_auto);
      const fechaRetro = () =>
        formateaFecha(this.adps[indice].eval_anual_retro);
      const fechaRex = () => formateaFecha(this.adps[indice].eval_anual_rex);

      enviaEvaluacionMensual(
        this.adps[indice].nombre_corregido,
        this.adps[indice].apellido_corregido,
        this.adps[indice].cargo,
        mes,
        // Fecha inicio
        `${fechaInicio(this.adps[indice])[2]}/${
          fechaInicio(this.adps[indice])[1]
        }/${this.anoActual}`,
        // Fecha Autoevaluación
        `${fechaEval(this.adps[indice])[2]}/${
          fechaEval(this.adps[indice])[1]
        }/${this.anoActual}`,
        // Fecha Retroalimentación
        `${fechaRetro(this.adps[indice])[2]}/${
          fechaRetro(this.adps[indice])[1]
        }/${this.anoActual}`,
        // Fecha Rex
        `${fechaRex(this.adps[indice])[2]}/${fechaRex(this.adps[indice])[1]}/${
          this.anoActual
        }`,
        this.adps[indice].encargado,
        this.adps[indice].encargado_mail,
        this.adps[indice].mail_contraparte_eval,
        `Servicio Civil - Informa sobre evaluación directiva`
      );

      creaDocumentoEnDB(
        `Alerta evaluación mensual ${mes}`,
        this.adps[indice].concurso,
        this.adps[indice].mail_contraparte_cd
      );
    },

    enviarCorreosDelMes() {
      let mes = this.solicitaMes();
      this.adpsDeEsteMes.forEach(({ indice }, i) => {
        setTimeout(() => {
          this.enviaMailPorFidelizador(mes, indice);
        }, i * 1000);
      });
      Vue.$toast.success("Correo enviado y registrado en planilla", {
        queue: true,
      });
    },

    format(date, locale, options) {
      return new Intl.DateTimeFormat(locale, options).format(date);
    },
  },
  computed: {
    ...mapState(["adps"]),
    mesActual() {
      const now = new Date();
      const mes_AnoCompleta = this.format(now, "es", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const mes = mes_AnoCompleta.split("/")[1];
      return mes;

      // const mesActual = new Date().toLocaleDateString().split("/")[1];
      // return `0${mesActual}`;
    },
    anoActual() {
      const now = new Date();
      const mes_AnoCompleta = this.format(now, "es", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const year = mes_AnoCompleta.split("/")[2];
      return year;
      // const anoActual = new Date().toLocaleDateString().split("/")[2];
      // return anoActual;
    },
    formateaFecha() {
      const now = new Date();
      const mes_AnoCompleta = this.format(now, "es", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const fechaMesAno = mes_AnoCompleta.split("/").splice(1, 2).join("/");
      return fechaMesAno;
    },
    largoArregloDestinatarios() {
      return this.adpsDeEsteMes.length;
    },
  },
  mounted() {
    // this.mes = this.mesActual;
    // this.ano = this.anoActual;
    this.mes_Ano = this.formateaFecha;
    this.ADPsAEvaluarseMesEnCurso();
  },
};
</script>

<style>
</style>