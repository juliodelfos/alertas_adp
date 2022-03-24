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
          <b
            >No cerrar la ventana hasta recibir confirmación de envío de todos
            los correos.</b
          >
        </p>
        <p>
          Para el periodo {{ this.formateaFecha }} deben evaluarse
          {{ largoArregloDestinatarios }} ADPs.
        </p>

        <div v-show="correosEnviados != 0">
          <h3 class="fs-5">Enviando</h3>
          <b-progress :max="largoArregloDestinatarios" show-value>
            <b-progress-bar :value="correosEnviados">
              <span>
                <strong
                  >{{ correosEnviados }} /
                  {{ largoArregloDestinatarios }}</strong
                ></span
              ></b-progress-bar
            >
          </b-progress>
        </div>

        <div id="reenvios">
          <p v-show="mailsFallidos.length !== 0" class="pb-1">
            Los correos a los siguientes concursos no se enviaron de manera
            correcta:
          </p>
          <ul
            v-for="(
              { nombre_corregido, apellido_corregido, concurso }, i
            ) in mailsFallidos"
            :key="i"
          >
            <li>
              {{ nombre_corregido }} {{ apellido_corregido }} - {{ concurso }}
            </li>
          </ul>

          <div v-show="correosReenviados != 0">
            <h3 class="fs-5">Enviando</h3>
            <b-progress :max="largoArregloCorreosAReenviar" show-value>
              <b-progress-bar :value="correosReenviados">
                <span>
                  <strong
                    >{{ correosReenviados }} /
                    {{ largoArregloCorreosAReenviar }}</strong
                  ></span
                ></b-progress-bar
              >
            </b-progress>
          </div>
        </div>
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
      <div class="text-center">
        <b-button
          variant="danger"
          class="mx-1"
          @click="enviarCorreosDelMes"
          v-show="largoArregloDestinatarios > 0"
          >Enviar</b-button
        >
        <b-button
          variant="danger"
          class="mx-1"
          @click="reintentarEnvio"
          v-show="mailsFallidos.length > 0"
          >Reenviar correos fallidos</b-button
        >
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import firebase from "firebase";
import { enviaEvaluacionMensual } from "@/metodosEnvioMails/evalMensual.js";

export default {
  name: "EvaluacionMensual",
  data() {
    return {
      concurso: "",
      // mes: "",
      // ano: "",
      mes_Ano: "",
      destinatarios: [],
      correosEnviados: 0,
      correosReenviados: 0,
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
      mailsFallidos: [],
      primerIntento: false,
      segundoIntento: false,
    };
  },
  methods: {
    solicitaMes() {
      return prompt(`¿Qué mes corresponde la alerta?`, `Ej. abril`);
    },

    fechaYHora() {
      return (
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      );
    },

    registraDBFirebase(tipo, concurso, destinatario) {
      const db = firebase.firestore();
      // Busco si existe el documento cuyo ID es el número de concurso
      const docRef = db.collection("alertasADPs").doc(concurso);

      docRef.get().then((doc) => {
        if (doc.exists) {
          // Se añade objeto a array de alertas del documento
          docRef.update({
            alertas: firebase.firestore.FieldValue.arrayUnion({
              tipo: tipo,
              destinatario: destinatario,
              fecha: this.fechaYHora(),
            }),
          });
          console.log("Alerta registrada en base de datos");
        } else {
          // En caso de que no exista el documento, se crea como array de objetos
          db.collection("alertasADPs")
            .doc(concurso.toString())
            .set({
              concurso: +concurso,
              alertas: [
                {
                  tipo: tipo,
                  destinatario: destinatario,
                  fecha: this.fechaYHora(),
                },
              ],
            })
            .then(() => console.log(`Alerta registrada en base de datos`))
            .catch((error) =>
              Vue.$toast.warning(
                `No se registró correo en planilla por: ${error}`
              )
            );
        }
      });
    },

    // registraDBFirebase(tipo, concurso, destinatario) {
    //   const db = firebase.firestore();
    //   db.collection("alertasEnviadas")
    //     .add({
    //       tipo: tipo,
    //       concurso: concurso,
    //       fecha: this.fechaYHora(),
    //       destinatario: destinatario,
    //     })
    //     .then(() => console.log("Correo registrado en planilla"))
    //     .catch((error) =>
    //       Vue.$toast.error("No se registró correo en planilla por: " + error)
    //     );
    // },

    // Evalúa Alertas a Enviar
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

    async enviarCorreosDelMes() {
      // Recoge mes
      let mes = this.solicitaMes().toLocaleLowerCase();
      // Con entries() obtengo el index de cada objeto del array
      // porque con for... of no trae el index como forEach
      for (const [i, adp] of this.adpsDeEsteMes.entries()) {
        // Calculas las fechas
        const formateaFecha = (fecha) =>
          fecha.split("T00:00:00.000Z")[0].split("-");
        const fechaInicio = () =>
          formateaFecha(this.adpsDeEsteMes[i].eval_anual_inicio);
        const fechaEval = () =>
          formateaFecha(this.adpsDeEsteMes[i].eval_anual_auto);
        const fechaRetro = () =>
          formateaFecha(this.adpsDeEsteMes[i].eval_anual_retro);
        const fechaRex = () =>
          formateaFecha(this.adpsDeEsteMes[i].eval_anual_rex);

        // Envías las alertas
        const correo = await enviaEvaluacionMensual(
          adp.nombre_corregido,
          adp.apellido_corregido,
          adp.cargo,
          mes,
          // Fecha inicio
          `${fechaInicio()[2]}/${fechaInicio()[1]}/${this.anoActual}`,
          // Fecha Autoevaluación
          `${fechaEval()[2]}/${fechaEval()[1]}/${this.anoActual}`,
          // Fecha Retroalimentación
          `${fechaRetro()[2]}/${fechaRetro()[1]}/${this.anoActual}`,
          // Fecha Rex
          `${fechaRex()[2]}/${fechaRex()[1]}/${this.anoActual}`,
          adp.encargado,
          adp.encargado_mail,
          adp.mail,
          `Servicio Civil - Informa sobre evaluación directiva`
        );

        if (correo == "OK") {
          this.correosEnviados++;
          this.registraDBFirebase(
            `Alerta evaluación mensual ${mes}`,
            `${this.adpsDeEsteMes[i].concurso}`,
            this.adpsDeEsteMes[i].mail_contraparte_cd
          );
        } else {
          this.mailsFallidos.push(this.adpsDeEsteMes[i]);
          Vue.$toast.error(
            `No se pudo enviar la alerta del concurso ${this.adpsDeEsteMes[i].concurso}`
          );
        }
      }
      this.primerIntento = true;
      this.primerIntento
        ? Vue.$toast.success("Correos enviados y registrados en planilla")
        : Vue.$toast.error("Revisar correos no enviados");
    },

    async reintentarEnvio() {
      // Recoge mes
      let mes = this.solicitaMes().toLocaleLowerCase();
      // Con entries() obtengo el index de cada objeto del array
      // porque con for... of no trae el index como forEach
      for (const [i, adp] of this.mailsFallidos.entries()) {
        // Calculas las fechas
        const formateaFecha = (fecha) =>
          fecha.split("T00:00:00.000Z")[0].split("-");
        const fechaInicio = () =>
          formateaFecha(this.mailsFallidos[i].eval_anual_inicio);
        const fechaEval = () =>
          formateaFecha(this.mailsFallidos[i].eval_anual_auto);
        const fechaRetro = () =>
          formateaFecha(this.mailsFallidos[i].eval_anual_retro);
        const fechaRex = () =>
          formateaFecha(this.mailsFallidos[i].eval_anual_rex);

        // Envías las alertas
        const correo = await enviaEvaluacionMensual(
          adp.nombre_corregido,
          adp.apellido_corregido,
          adp.cargo,
          mes,
          // Fecha inicio
          `${fechaInicio()[2]}/${fechaInicio()[1]}/${this.anoActual}`,
          // Fecha Autoevaluación
          `${fechaEval()[2]}/${fechaEval()[1]}/${this.anoActual}`,
          // Fecha Retroalimentación
          `${fechaRetro()[2]}/${fechaRetro()[1]}/${this.anoActual}`,
          // Fecha Rex
          `${fechaRex()[2]}/${fechaRex()[1]}/${this.anoActual}`,
          adp.encargado,
          adp.encargado_mail,
          adp.mail,
          `Servicio Civil - Informa sobre evaluación directiva`
        );

        if (correo == "OK") {
          this.correosReenviados++;
          this.registraDBFirebase(
            `Alerta evaluación mensual ${mes}`,
            `${this.mailsFallidos[i].concurso}`,
            this.mailsFallidos[i].mail_contraparte_cd
          );
        } else {
          Vue.$toast.error(
            `No se pudo enviar la alerta del concurso ${this.mailsFallidos[i].concurso}`
          );
        }
      }
      this.segundoIntento = true;
      this.segundoIntento
        ? Vue.$toast.success("Correos enviados y registrados en planilla")
        : Vue.$toast.error(
            "Enviar alertas fallidas desde la vista de envío masivos de todos los correos"
          );
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
    largoArregloCorreosAReenviar() {
      return this.mailsFallidos.length;
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