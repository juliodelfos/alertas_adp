<template>
  <div>
    <b-row no-gutters>
      <div class="bg-primary text-center pt-3 pb-2 text-white shadow">
        <h1 class="fs-4">
          <b-icon icon="person-circle"></b-icon>
          {{ adps[this.indice].nombre_corregido.split(" ")[0] }}
          {{ adps[this.indice].apellido_corregido.split(" ")[0] }}
          ·
          {{ adps[this.indice].concurso }}
        </h1>
      </div>

      <!-- Foto, gráfico y correos -->
      <b-row class="py-4 pe-5">
        <b-col md="6">
          <Grafico
            :porcentaje_dias_cargo="adps[this.indice].porcentaje_dias_cargo"
            :porcentaje_dias_anogestion="
              adps[this.indice].porcentaje_dias_anogestion
            "
          />
        </b-col>
        <b-col md="6">
          <UltimosCorreos :concurso="adps[this.indice].concurso" />
        </b-col>
      </b-row>

      <!-- Datos básicos -->
      <Identificacion
        class="pe-5"
        :cargo="adps[this.indice].cargo"
        :fecha_nombramiento_renovacion="
          adps[this.indice].fecha_nombramiento_renovacion
        "
        :estado_adp="adps[this.indice].estado_adp"
        :mail="adps[this.indice].mail"
        :mail_contraparte_cd="adps[this.indice].mail_contraparte_cd"
        :mail_contraparte_eval="adps[this.indice].mail_contraparte_eval"
        :estado_cd="adps[this.indice].estado_cd"
        :servicio="adps[this.indice].servicio"
        :nombre="adps[this.indice].nombre"
        :apellido="adps[this.indice].apellido"
      />

      <!-- Pestañas -->
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Convenio de desempeño" active>
          <div id="alertasConvenio">
            <Convenio
              v-if="adps[this.indice].estado_cd !== 'Suscrito'"
              :fecha_comunicacion="adps[this.indice].fecha_comunicacion"
              :fecha_propuesta="adps[this.indice].fecha_propuesta"
              :fecha_suscripcion="adps[this.indice].fecha_suscripcion"
              :estado_adp="adps[this.indice].estado_adp"
              @alertaCero="alertaCero(adps[indice].indice)"
              @alertaCeroRenovado="alertaCeroRenovado(adps[indice].indice)"
              @alertaSesenta="alertaSesenta(adps[indice].indice)"
              @alertaNoventa="alertaNoventa(adps[indice].indice)"
              @calendarAlertaCero="calendarAlertaCero(adps[indice].indice)"
              @calendarAlertaSesenta="
                calendarAlertaSesenta(adps[indice].indice)
              "
              @calendarAlertaNoventa="
                calendarAlertaNoventa(adps[indice].indice)
              "
            />
            <div class="text-center pt-3 pb-4 fs-5 fw-bold" v-else>
              Convenio suscrito
              <b-icon icon="check-circle-fill" id="convenioSuscrito"></b-icon>
            </div>
          </div>
        </b-tab>
        <b-tab title="Evaluaciones semestrales">
          <div id="Evaluaciones semestrales">
            <Semestrales
              v-if="
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Barrancas' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Andalién Sur' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Atacama' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Chinchorro' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Colchagua' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Costa Araucanía' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Gabriela Mistral' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Huasco' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Llanquihue' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Puerto Cordillera' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Valparaíso' ||
                adps[this.indice].nivel == 'II'
              "
              :eval_semestral_inicio="adps[this.indice].eval_semestral_inicio"
              :eval_semestral_auto="adps[this.indice].eval_semestral_auto"
              :eval_semestral_retro="adps[this.indice].eval_semestral_retro"
              :mail="adps[this.indice].mail"
              :nombre_corregido="adps[this.indice].nombre_corregido"
              :apellido_corregido="adps[this.indice].apellido_corregido"
              @autoEvalSemestral="autoEvalSemestral(adps[indice].indice)"
              @calendarInicioEvalParcial="
                calendarInicioEvalParcial(adps[indice].indice)
              "
              @calendarAutoEvalParcial="
                calendarAutoEvalParcial(adps[indice].indice)
              "
              @calendarRetroEvalParcial="
                calendarRetroEvalParcial(adps[indice].indice)
              "
            />
            <div class="text-center pt-3 pb-4 fs-5 fw-bold" v-else>
              I niveles no sujetos a evaluación parcial
            </div>
          </div>
        </b-tab>
        <b-tab title="Evaluaciones anuales">
          <div
            class="text-center pt-3 pb-4 fs-5 fw-bold"
            v-if="
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Barrancas') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Andalién Sur') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Atacama') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Chinchorro') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Colchagua') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Costa Araucanía') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Gabriela Mistral') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Huasco') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Llanquihue') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Puerto Cordillera') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Valparaíso')
            "
          >
            Fecha varía según año escolar
          </div>
          <Anuales
            v-else
            :eval_anual_inicio="adps[this.indice].eval_anual_inicio"
            :eval_anual_auto="adps[this.indice].eval_anual_auto"
            :eval_anual_retro="adps[this.indice].eval_anual_retro"
            :eval_anual_rex="adps[this.indice].eval_anual_rex"
            :mail="adps[this.indice].mail"
            :nombre_corregido="adps[this.indice].nombre_corregido"
            :apellido_corregido="adps[this.indice].apellido_corregido"
            @autoEvalAnual="autoEvalAnual(adps[indice].indice)"
            @rexEvalAnual="rexEvalAnual(adps[indice].indice)"
            @calendarInicioEvalAnual="
              calendarInicioEvalAnual(adps[indice].indice)
            "
            @calendarAutoEvalAnual="calendarAutoEvalAnual(adps[indice].indice)"
            @calendarRetroEvalAnual="
              calendarRetroEvalAnual(adps[indice].indice)
            "
            @calendarRetroEvalAnualREX="
              calendarRetroEvalAnualREX(adps[indice].indice)
            "
          />
        </b-tab>
        <b-tab title="Otras comunicaciones">
          <Otras
            :estado_adp="adps[this.indice].estado_adp"
            @claveSICDE="claveSICDE(adps[indice].indice)"
            @claveAPP="claveAPP(adps[indice].indice)"
            @encuestaCierre="encuestaCierre(adps[indice].indice)"
            @encuestaPercepcion="encuestaPercepcion(adps[indice].indice)"
          />
        </b-tab>
      </b-tabs>
    </b-row>
  </div>
  <!-- </div> -->
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import emailjs from "emailjs-com";
import axios from "axios";
import Convenio from "@/components/perfil/pestanas/Convenio.vue";
import Semestrales from "@/components/perfil/pestanas/Semestrales.vue";
import Anuales from "@/components/perfil/pestanas/Anuales.vue";
import Otras from "@/components/perfil/pestanas/Otras.vue";
import Identificacion from "@/components/perfil/datos_personales/Identificacion.vue";
import Grafico from "@/components/perfil/datos_personales/Grafico.vue";
import UltimosCorreos from "@/components/perfil/datos_personales/UltimosCorreos.vue";
export default {
  name: "DatosPersonales",
  components: {
    Convenio,
    Semestrales,
    Anuales,
    Otras,
    Identificacion,
    Grafico,
    UltimosCorreos,
  },
  data() {
    return {
      concurso: "",
      id: "",
      servicio: "",
      estadoConvenio: "",
      nombreADP: "",
      correosSalientes: [],
    };
  },
  props: ["indice"],
  methods: {
    // Correos de Alerta
    alertaCero(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar la Alerta Cero al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        // Se formatean fechas
        const fechaNombramiento = this.adps[i].fecha_nombramiento_renovacion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const fechaComunicacion = this.adps[i].fecha_comunicacion
          .split("T00:00:00.000Z")[0]
          .split("-");

        // Variables requeridas por EmailJS
        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          apellido_ADP: this.adps[i].apellido_corregido,
          cargo_ADP: this.adps[i].cargo,
          email: this.adps[i].mail_contraparte_cd,
          // email: "desarrolloadp@serviciocivil.cl",
          nombramiento_ADP: `${fechaNombramiento[2]}/${fechaNombramiento[1]}/${fechaNombramiento[0]}`,
          suscripcion_ADP: `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`,
          comunicacion_ADP: `${fechaComunicacion[2]}/${fechaComunicacion[1]}/${fechaComunicacion[0]}`,
          anadir_nombramiento: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_nombramiento_renovacion.split(
              "T00:00:00.000Z"
            )[0]
          } 08:00&title=Inicio elaboración convenio ${
            this.adps[i].nombre_corregido
          } ${
            this.adps[i].apellido_corregido
          }&timezone=America/Santiago">Añadir al Calendario</a>`,
          anadir_suscripcion: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_suscripcion.split("T00:00:00.000Z")[0]
          } 08:00&title=Suscripción convenio ${this.adps[i].nombre_corregido} ${
            this.adps[i].apellido_corregido
          }&timezone=America/Santiago">Añadir al Calendario</a>`,
          anadir_comunicacion: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_comunicacion.split("T00:00:00.000Z")[0]
          } 08:00&title=Comunicación convenio ${
            this.adps[i].nombre_corregido
          } ${
            this.adps[i].apellido_corregido
          } (90 días)&timezone=America/Santiago">Añadir al Calendario</a>`,
        };
        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "alerta0_nombrado";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail_contraparte_cd;

          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Cero primer periodo", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    alertaCeroRenovado(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar la alerta cero para ADP renovado al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        // Creo arrays con cada número de la fecha para ordenarlos en fecha chilena
        const fechaNombramiento = this.adps[i].fecha_nombramiento_renovacion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const fechaComunicacion = this.adps[i].fecha_comunicacion
          .split("T00:00:00.000Z")[0]
          .split("-");

        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          apellido_ADP: this.adps[i].apellido_corregido,
          cargo_ADP: this.adps[i].cargo,
          email: this.adps[i].mail_contraparte_cd,
          // email: "desarrolloadp@serviciocivil.cl",
          nombramiento_ADP: `${fechaNombramiento[2]}/${fechaNombramiento[1]}/${fechaNombramiento[0]}`,
          suscripcion_ADP: `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`,
          comunicacion_ADP: `${fechaComunicacion[2]}/${fechaComunicacion[1]}/${fechaComunicacion[0]}`,
          anadir_nombramiento: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_nombramiento_renovacion.split(
              "T00:00:00.000Z"
            )[0]
          } 08:00&title=Inicio elaboración convenio ${
            this.adps[i].nombre_corregido
          } ${
            this.adps[i].apellido_corregido
          }&timezone=America/Santiago">Añadir al Calendario</a>`,
          anadir_suscripcion: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_suscripcion.split("T00:00:00.000Z")[0]
          } 08:00&title=Suscripción convenio ${this.adps[i].nombre_corregido} ${
            this.adps[i].apellido_corregido
          }&timezone=America/Santiago">Añadir al Calendario</a>`,
          anadir_comunicacion: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_comunicacion.split("T00:00:00.000Z")[0]
          } 08:00&title=Comunicación convenio ${
            this.adps[i].nombre_corregido
          } ${
            this.adps[i].apellido_corregido
          } (90 días)&timezone=America/Santiago">Añadir al Calendario</a>`,
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "alerta0_renovado";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail_contraparte_cd;

          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Cero Renovado", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    alertaSesenta(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar alerta sesenta al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");

        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          apellido_ADP: this.adps[i].apellido_corregido,
          estado_cd: this.adps[i].estado_cd,
          suscripcion_ADP: `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`,
          anadir_suscripcion: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_suscripcion.split("T00:00:00.000Z")[0]
          } 08:00&title=Suscripción convenio ${this.adps[i].nombre_corregido} ${
            this.adps[i].apellido_corregido
          }&timezone=America/Santiago">Añadir al Calendario</a>`,
          email: this.adps[i].mail_contraparte_cd,
          // email: "desarrolloadp@serviciocivil.cl",
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "alerta60";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail_contraparte_cd;

          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Sesenta", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    alertaNoventa(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar alerta noventa al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const fechaComunicacion = this.adps[i].fecha_comunicacion
          .split("T00:00:00.000Z")[0]
          .split("-");

        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          apellido_ADP: this.adps[i].apellido_corregido,
          estado_cd: this.adps[i].estado_cd,
          suscripcion_ADP: `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`,
          comunicacion_ADP: `${fechaComunicacion[2]}/${fechaComunicacion[1]}/${fechaComunicacion[0]}`,
          anadir_suscripcion: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_suscripcion.split("T00:00:00.000Z")[0]
          } 08:00&title=Suscripción convenio ${this.adps[i].nombre_corregido} ${
            this.adps[i].apellido_corregido
          }&timezone=America/Santiago">Añadir al Calendario</a>`,
          anadir_comunicacion: `<a href="https://calndr.link/d/event/?service=google&start=${
            this.adps[i].fecha_comunicacion.split("T00:00:00.000Z")[0]
          } 08:00&title=Suscripción convenio ${this.adps[i].nombre_corregido} ${
            this.adps[i].apellido_corregido
          }&timezone=America/Santiago">Añadir al Calendario</a>`,
          email: this.adps[i].mail_contraparte_cd,
          // email: "desarrolloadp@serviciocivil.cl",
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "alerta90";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail_contraparte_cd;
          
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Noventa", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    // Métodos de Calendario
    calendarAlertaCero(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `30 días desde el nombramiento de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Han pasado 30 días desde la fecha de nombramiento o renovación`,
          start: {
            dateTime: `${
              this.adps[i].fecha_propuesta.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].fecha_propuesta.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    calendarAlertaSesenta(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `60 días desde el nombramiento de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Han pasado 60 días desde la fecha de nombramiento o renovación`,
          start: {
            dateTime: `${
              this.adps[i].fecha_suscripcion.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].fecha_suscripcion.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    calendarAlertaNoventa(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `90 días desde el nombramiento de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Plazo fatal de suscripción del convenio de desempeño`,
          start: {
            dateTime: `${
              this.adps[i].fecha_comunicacion.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].fecha_comunicacion.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    //
    //
    // Evaluaciones Semestrales
    autoEvalSemestral(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar alerta evaluación semestral pendiente al mail ${this.adps[i].mail}`
      );
      if (solicitaConfirmacion) {
        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          email: this.adps[i].mail,
          // email: "desarrolloadp@serviciocivil.cl",
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "autoEvalParcial";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail;

          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Eval parcial pendiente", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    // Métodos de Calendario
    calendarInicioEvalParcial(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `Inicio evaluación parcial de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Inicio evaluación parcial`,
          start: {
            dateTime: `${
              this.adps[i].eval_semestral_inicio.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].eval_semestral_inicio.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    calendarAutoEvalParcial(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `Término periodo autoevaluación parcial de de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Término periodo autoevaluación parcial`,
          start: {
            dateTime: `${
              this.adps[i].eval_semestral_auto.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].eval_semestral_auto.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    calendarRetroEvalParcial(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `Término retroalimentación evaluación parcial de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Plazo fatal de suscripción del convenio de desempeño`,
          start: {
            dateTime: `${
              this.adps[i].eval_semestral_retro.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].eval_semestral_retro.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    //
    //
    // Evaluaciones Anuales
    autoEvalAnual(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar alerta evaluación anual pendiente al mail ${this.adps[i].mail}`
      );
      if (solicitaConfirmacion) {
        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          email: this.adps[i].mail,
          // email: "desarrolloadp@serviciocivil.cl",
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "autoEvalAnual";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail;

          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Eval anual pendiente", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    rexEvalAnual(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar alerta REX evaluación anual pendiente al mail ${this.adps[i].mail_contraparte_eval}`
      );
      if (solicitaConfirmacion) {
        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          apellido_ADP: this.adps[i].apellido_corregido,
          email: this.adps[i].mail_contraparte_eval,
          // email: "desarrolloadp@serviciocivil.cl",
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "rexEvalAnual";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail_contraparte_eval;

          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["REX Eval anual pendiente", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    // Métodos de Calendario
    calendarInicioEvalAnual(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `Inicio evaluación anual de de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Inicio evaluación anual`,
          start: {
            dateTime: `${
              this.adps[i].eval_anual_inicio.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].eval_anual_inicio.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    calendarAutoEvalAnual(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `Término plazo autoevaluación anual de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Término plazo autoevaluación`,
          start: {
            dateTime: `${
              this.adps[i].eval_anual_auto.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].eval_anual_auto.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    calendarRetroEvalAnual(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `Término plazo retroalimentación anual de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Plazo fatal de suscripción del convenio de desempeño`,
          start: {
            dateTime: `${
              this.adps[i].eval_anual_retro.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].eval_anual_retro.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    calendarRetroEvalAnualREX(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/CCchNoezLaivkrgi/event?calendarId=c_2eq0jmn2nban422ruotm00h3fg@group.calendar.google.com&sendNotifications=true&sendUpdates=none",
        data: {
          summary: `Término plazo para subir REX evaluación anual de ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } ${this.adps[i].apellido_corregido.split(" ")[0]} [${
            this.adps[i].concurso
          }]`,
          description: `Término de los 5 días hábiles`,
          start: {
            dateTime: `${
              this.adps[i].eval_anual_rex.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].eval_anual_rex.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
        },
      })
        .then((response) => {
          console.log(response.data);
          Vue.$toast.success("Evento añadido a calendario compartido");
        })
        .catch((error) => {
          console.log(error);
          Vue.$toast.warning(
            "Hubo un error al registrar el evento en calendario"
          );
        });
    },
    //
    //
    // Otros mensajes
    claveSICDE(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres clave SICDE al mail ${this.adps[i].mail}`
      );

      if (solicitaConfirmacion) {
        // Función para remover tildes
        const removeAccents = (str) =>
          str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const iniciales = removeAccents(
          this.adps[i].nombre_corregido.charAt(0).toLowerCase() +
            this.adps[i].apellido_corregido.charAt(0).toLowerCase()
        );

        const clave = `${iniciales}1234`;

        // Variables requeridas por EmailJS
        const templateParams = {
          usuario_SICDE: this.adps[i].mail,
          clave_SICDE: clave,
          email: this.adps[i].mail,
          // email: "desarrolloadp@serviciocivil.cl",
        };
        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "claveSICDE";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail;

          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Clave SICDE", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    claveAPP(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres clave APP al mail ${this.adps[i].mail}`
      );

      if (solicitaConfirmacion) {
        // Función para remover tildes
        const removeAccents = (str) =>
          str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const iniciales = removeAccents(
          this.adps[i].nombre_corregido.charAt(0).toLowerCase() +
            this.adps[i].apellido_corregido.charAt(0).toLowerCase()
        );

        const clave = `${iniciales}1234`;

        // Variables requeridas por EmailJS
        const templateParams = {
          usuario_APP: this.adps[i].mail,
          clave_APP: clave,
          email: this.adps[i].mail,
        };
        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "claveAPP";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail;
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Clave app", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    bienvenida(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar correo del bienvenida al mail ${this.adps[i].mail}`
      );
      if (solicitaConfirmacion) {
        const nombre = this.adps[i].nombre_corregido.split(" ")[0];
        const apellido = this.adps[i].apellido_corregido.split(" ")[0];

        const templateParams = {
          nombre_ADP: nombre,
          apellido_ADP: apellido,
          email: this.adps[i].mail,
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "mailBienvenida";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail;
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Bienvenida", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    bienvenidaRenovado(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar correo del bienvenida al mail ${this.adps[i].mail}`
      );
      if (solicitaConfirmacion) {
        const nombre = this.adps[i].nombre_corregido.split(" ")[0];
        const apellido = this.adps[i].apellido_corregido.split(" ")[0];

        const templateParams = {
          nombre_ADP: nombre,
          apellido_ADP: apellido,
          email: this.adps[i].mail,
          // email: "desarrolloadp@serviciocivil.cl",
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "mailBienvenida";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail;
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Bienvenida Renovado", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    encuestaCierre(i) {
      const solicitaConfirmacion = prompt(
        `¿A qué dirección de correo enviarás esta alerta?`,
        `Recuerda que debe ser un correo personal`
      );
      if (solicitaConfirmacion) {
        const nombre = this.adps[i].nombre_corregido.split(" ")[0];
        const templateParams = {
          nombre_ADP: nombre,
          email: solicitaConfirmacion,
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "cuestionarioCierre";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const mailDestinatario = solicitaConfirmacion;
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [
              ["Cuestionario de cierre", concurso, fecha, mailDestinatario],
            ],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
          Vue.$toast.info(
            "Recuerda registrar la alerta en SICDE y también en planilla de desvinculados"
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
    encuestaPercepcion(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar encuesta percepcion al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const templateParams = {
          nombre_ADP: this.adps[i].nombre_corregido,
          apellido_ADP: this.adps[i].apellido_corregido,
          cargo_ADP: this.adps[i].cargo,
          email: this.adps[i].mail_contraparte_cd,
        };

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "encuestaPercepcion";
        const serviceID = "desarrolloadp";

        const correo = emailjs
          .send(serviceID, templateID, templateParams, userID)
          .then(
            (result) => console.log(result.text),
            (error) => console.log(error.text)
          );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas' sólo si correo sale
        if (correo) {
          const fecha =
            new Date().toLocaleDateString() +
            " " +
            new Date().toLocaleTimeString();
          const concurso = this.adps[i].concurso;
          const destinatario = this.adps[i].mail_contraparte_cd;
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Encuesta de percepción", concurso, fecha, destinatario]],
          })
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
          Vue.$toast.success("Correo enviado y registrado en planilla");
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },
  },

  computed: {
    ...mapState(["adps"]),
  },
  created() {
    this.concurso = this.$attrs.id;
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
}

.row {
  padding: 0;
  margin: 0;
}
</style>
