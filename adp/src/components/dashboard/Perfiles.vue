<template>
  <div>
    <div
      no-body
      class="overflow-hidden mb-4"
      v-for="(adp, i) in filtrarADPs"
      :key="i"
    >
      <b-row no-gutters>
        <div class="bg-dark text-center pb-1">
          <h1 class="fs-4">
            <b-icon icon="person-circle"></b-icon>
            {{ adp.nombre_corregido.split(" ")[0] }}
            {{ adp.apellido_corregido.split(" ")[0] }}
            ·
            {{ adp.concurso }}
          </h1>
        </div>

        <!-- Foto, gráfico y correos -->
        <b-row class="py-4 pe-5">
          <b-col md="2" class="text-center my-auto pt-4">
            <FotoPerfil :img="adp.img" />
          </b-col>
          <b-col md="6">
            <Grafico
              :porcentaje_dias_cargo="adp.porcentaje_dias_cargo"
              :porcentaje_dias_anogestion="adp.porcentaje_dias_anogestion"
            />
          </b-col>
          <b-col md="4">
            <UltimosCorreos :concurso="adp.concurso" />
          </b-col>
        </b-row>

        <!-- Datos básicos -->
        <Datos
          class="pe-5"
          :cargo="adp.cargo"
          :fecha_nombramiento_renovacion="adp.fecha_nombramiento_renovacion"
          :estado_adp="adp.estado_adp"
          :mail="adp.mail"
          :mail_contraparte_cd="adp.mail_contraparte_cd"
          :mail_contraparte_eval="adp.mail_contraparte_eval"
          :estado_cd="adp.estado_cd"
          :servicio="adp.servicio"
        />

        <!-- Pestañas -->
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Convenio de desempeño" active>
            <div id="alertasConvenio">
              <Convenio
                v-if="adp.estado_cd !== 'Suscrito'"
                :fecha_comunicacion="adp.fecha_comunicacion"
                :fecha_propuesta="adp.fecha_propuesta"
                :fecha_suscripcion="adp.fecha_suscripcion"
                :estado_adp="adp.estado_adp"
                @registrarCorreo="registrarCorreo()"
                @alertaCero="alertaCero(adp.indice)"
                @alertaCeroRenovado="alertaCeroRenovado(adp.indice)"
                @alertaSesenta="alertaSesenta(adp.indice)"
                @alertaNoventa="alertaNoventa(adp.indice)"
                @calendarAlertaCero="calendarAlertaCero(adp.indice)"
                @calendarAlertaSesenta="calendarAlertaSesenta(adp.indice)"
                @calendarAlertaNoventa="calendarAlertaNoventa(adp.indice)"
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
                  adp.servicio == 'Servicio Local de Educación Barrancas' ||
                  adp.servicio == 'Servicio Local de Educación Andalién Sur' ||
                  adp.servicio == 'Servicio Local de Educación Atacama' ||
                  adp.servicio == 'Servicio Local de Educación Chinchorro' ||
                  adp.servicio == 'Servicio Local de Educación Colchagua' ||
                  adp.servicio ==
                    'Servicio Local de Educación Costa Araucanía' ||
                  adp.servicio ==
                    'Servicio Local de Educación Gabriela Mistral' ||
                  adp.servicio == 'Servicio Local de Educación Huasco' ||
                  adp.servicio == 'Servicio Local de Educación Llanquihue' ||
                  adp.servicio ==
                    'Servicio Local de Educación Puerto Cordillera' ||
                  adp.servicio == 'Servicio Local de Educación Valparaíso' ||
                  adp.nivel == 'II'
                "
                :eval_semestral_inicio="adp.eval_semestral_inicio"
                :eval_semestral_auto="adp.eval_semestral_auto"
                :eval_semestral_retro="adp.eval_semestral_retro"
                :mail="adp.mail"
                :nombre_corregido="adp.nombre_corregido"
                :apellido_corregido="adp.apellido_corregido"
                @inicioEvalSemestral="inicioEvalSemestral(adp.indice)"
                @autoEvalSemestral="autoEvalSemestral(adp.indice)"
                @retroEvalSemestral="retroEvalSemestral(adp.indice)"
                @calendarInicioEvalParcial="
                  calendarInicioEvalParcial(adp.indice)
                "
                @calendarAutoEvalParcial="calendarAutoEvalParcial(adp.indice)"
                @calendarRetroEvalParcial="calendarRetroEvalParcial(adp.indice)"
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
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Barrancas') ||
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Andalién Sur') ||
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Atacama') ||
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Chinchorro') ||
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Colchagua') ||
                (adp.nivel == 'I' &&
                  adp.servicio ==
                    'Servicio Local de Educación Costa Araucanía') ||
                (adp.nivel == 'I' &&
                  adp.servicio ==
                    'Servicio Local de Educación Gabriela Mistral') ||
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Huasco') ||
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Llanquihue') ||
                (adp.nivel == 'I' &&
                  adp.servicio ==
                    'Servicio Local de Educación Puerto Cordillera') ||
                (adp.nivel == 'I' &&
                  adp.servicio == 'Servicio Local de Educación Valparaíso')
              "
            >
              Fecha varía según año escolar
            </div>
            <Anuales
              v-else
              :eval_anual_inicio="adp.eval_anual_inicio"
              :eval_anual_auto="adp.eval_anual_auto"
              :eval_anual_retro="adp.eval_anual_retro"
              :eval_anual_rex="adp.eval_anual_rex"
              :mail="adp.mail"
              :nombre_corregido="adp.nombre_corregido"
              :apellido_corregido="adp.apellido_corregido"
              @inicioEvalAnual="inicioEvalAnual(adp.indice)"
              @autoEvalAnual="autoEvalAnual(adp.indice)"
              @retroEvalAnual="retroEvalAnual(adp.indice)"
              @rexEvalAnual="rexEvalAnual(adp.indice)"
              @calendarInicioEvalAnual="calendarInicioEvalAnual(adp.indice)"
              @calendarAutoEvalAnual="calendarAutoEvalAnual(adp.indice)"
              @calendarRetroEvalAnual="calendarRetroEvalAnual(adp.indice)"
              @calendarRetroEvalAnualREX="calendarRetroEvalAnualREX(adp.indice)"
            />
          </b-tab>
          <b-tab title="Otras comunicaciones">
            <Otras
              :estado_adp="adp.estado_adp"
              @claveSICDE="claveSICDE(adp.indice)"
              @claveAPP="claveAPP(adp.indice)"
              @bienvenida="bienvenida(adp.indice)"
              @encuestaCierre="encuestaCierre(adp.indice)"
            />
          </b-tab>
        </b-tabs>
      </b-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import emailjs from "emailjs-com";
import axios from "axios";
import Convenio from "@/components/dashboard/pestanas/Convenio.vue";
import Semestrales from "@/components/dashboard/pestanas/Semestrales.vue";
import Anuales from "@/components/dashboard/pestanas/Anuales.vue";
import Otras from "@/components/dashboard/pestanas/Otras.vue";
import Datos from "@/components/dashboard/datos_personales/Datos.vue";
import Grafico from "@/components/dashboard/datos_personales/Grafico.vue";
import FotoPerfil from "@/components/dashboard/datos_personales/FotoPerfil.vue";
import UltimosCorreos from "@/components/dashboard/datos_personales/UltimosCorreos.vue";
import Filtros from "@/components/dashboard/buscador/Filtros.vue";
export default {
  name: "Perfiles",
  components: {
    Convenio,
    Semestrales,
    Anuales,
    Otras,
    Datos,
    Grafico,
    Filtros,
    FotoPerfil,
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
  methods: {
    // Inicio Filtros
    filtroPorNombreDeServicio(adps) {
      return adps.filter((adp) => !adp.servicio.indexOf(this.servicio));
    },
    filtroPorEstadoConvenio(adps) {
      return adps.filter((adp) => !adp.estado_cd.indexOf(this.estadoConvenio));
    },
    filtroPorConcurso(adps) {
      return adps.filter(
        (adp) => !adp.concurso.toString().indexOf(this.concurso)
      );
    },
    filtroPorNombreADP(adps) {
      return adps.filter(
        (adp) =>
          !adp.nombre_corregido
            .toLowerCase()
            .indexOf(this.nombreADP.toLowerCase())
      );
    },
    //
    //
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yersonob@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Cero primer periodo", concurso, fecha]],
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yersonob@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Cero Renovado", concurso, fecha]],
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yersonob@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Sesenta", concurso, fecha]],
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yerson.o.b@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Alerta Noventa", concurso, fecha]],
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
    inicioEvalSemestral(i) {
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yersonob@gmail.com",
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

        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
        const fecha = new Date().toLocaleDateString();
        const hora = new Date().toLocaleTimeString();
        const concurso = this.adps[i].concurso;
        axios({
          method: "post",
          url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
          data: [["Alerta Cero primer periodo", concurso, fecha + " " + hora]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        alert("Correo enviado y registrado en planilla");
      } else {
        alert("No enviado");
      }
    },
    autoEvalSemestral(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar alerta sesenta al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const suscripcion_ADP = `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`;
        const nombre_ADP = this.adps[i].nombre_corregido;
        const apellido_ADP = this.adps[i].apellido_corregido;
        const cargo_ADP = this.adps[i].cargo;
        const email = this.adps[i].mail_contraparte_cd;

        const templateParams = {};

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "general";
        const serviceID = "gmail_dnsc";

        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
        const fecha = new Date().toLocaleDateString();
        const concurso = this.adps[i].concurso;
        axios({
          method: "post",
          url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
          data: [["Alerta Sesenta primer periodo", concurso, fecha]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        console.log("Correo enviado y registrado en planilla");
      } else {
        console.log("No enviado");
      }
    },
    retroEvalSemestral(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar la alerta noventa al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const suscripcion_ADP = `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`;
        const nombre_ADP = this.adps[i].nombre_corregido;
        const apellido_ADP = this.adps[i].apellido_corregido;
        const cargo_ADP = this.adps[i].cargo;
        const email = this.adps[i].mail_contraparte_cd;

        const templateParams = {};

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "general";
        const serviceID = "gmail_dnsc";

        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
        const fecha = new Date().toLocaleDateString();
        const concurso = this.adps[i].concurso;
        axios({
          method: "post",
          url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
          data: [["Alerta Noventa Primer Periodo", concurso, fecha]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        console.log("Correo enviado y registrado en planilla");
      } else {
        console.log("No enviado");
      }
    },
    // Métodos de Calendario
    calendarInicioEvalParcial(i) {
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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    calendarAutoEvalParcial(i) {
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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    calendarRetroEvalParcial(i) {
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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    //
    //
    // Evaluaciones Semestrales
    inicioEvalAnual(i) {
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yersonob@gmail.com",
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

        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
        const fecha = new Date().toLocaleDateString();
        const concurso = this.adps[i].concurso;
        axios({
          method: "post",
          url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
          data: [["Alerta Cero primer periodo", concurso, fecha]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        alert("Correo enviado y registrado en planilla");
      } else {
        alert("No enviado");
      }
    },
    autoEvalAnual(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar alerta sesenta al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const suscripcion_ADP = `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`;
        const nombre_ADP = this.adps[i].nombre_corregido;
        const apellido_ADP = this.adps[i].apellido_corregido;
        const cargo_ADP = this.adps[i].cargo;
        const email = this.adps[i].mail_contraparte_cd;

        const templateParams = {};

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "general";
        const serviceID = "gmail_dnsc";

        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
        const fecha = new Date().toLocaleDateString();
        const concurso = this.adps[i].concurso;
        axios({
          method: "post",
          url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
          data: [["Alerta Sesenta primer periodo", concurso, fecha]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        console.log("Correo enviado y registrado en planilla");
      } else {
        console.log("No enviado");
      }
    },
    retroEvalAnual(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar la alerta noventa al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const suscripcion_ADP = `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`;
        const nombre_ADP = this.adps[i].nombre_corregido;
        const apellido_ADP = this.adps[i].apellido_corregido;
        const cargo_ADP = this.adps[i].cargo;
        const email = this.adps[i].mail_contraparte_cd;

        const templateParams = {};

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "general";
        const serviceID = "gmail_dnsc";

        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
        const fecha = new Date().toLocaleDateString();
        const concurso = this.adps[i].concurso;
        axios({
          method: "post",
          url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
          data: [["Alerta Noventa Primer Periodo", concurso, fecha]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        console.log("Correo enviado y registrado en planilla");
      } else {
        console.log("No enviado");
      }
    },
    rexEvalAnual(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar la alerta noventa al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const suscripcion_ADP = `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`;
        const nombre_ADP = this.adps[i].nombre_corregido;
        const apellido_ADP = this.adps[i].apellido_corregido;
        const cargo_ADP = this.adps[i].cargo;
        const email = this.adps[i].mail_contraparte_cd;

        const templateParams = {};

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "general";
        const serviceID = "gmail_dnsc";

        emailjs.send(serviceID, templateID, templateParams, userID).then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );

        //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
        const fecha = new Date().toLocaleDateString();
        const concurso = this.adps[i].concurso;
        axios({
          method: "post",
          url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
          data: [["Alerta Noventa Primer Periodo", concurso, fecha]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        console.log("Correo enviado y registrado en planilla");
      } else {
        console.log("No enviado");
      }
    },
    // Métodos de Calendario
    calendarInicioEvalAnual(i) {
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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    calendarAutoEvalAnual(i) {
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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    calendarRetroEvalAnual(i) {
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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    calendarRetroEvalAnualREX(i) {
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
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yersonob@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Clave SICDE", concurso, fecha]],
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
          // email: this.adps[i].mail_contraparte_cd,
          email: "yersonob@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Clave app", concurso, fecha]],
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
          // email: this.adps[i].mail,
          email: "yersonob@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Bienvenida", concurso, fecha]],
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
        `¿Seguro que quieres enviar la alerta noventa al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
        const fechaSuscripcion = this.adps[i].fecha_suscripcion
          .split("T00:00:00.000Z")[0]
          .split("-");
        const suscripcion_ADP = `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`;
        const nombre_ADP = this.adps[i].nombre_corregido;
        const apellido_ADP = this.adps[i].apellido_corregido;
        const cargo_ADP = this.adps[i].cargo;
        const email = this.adps[i].mail_contraparte_cd;

        const templateParams = {};

        const userID = "user_j03eIIBx2tfg0roipyWbX";
        const templateID = "general";
        const serviceID = "gmail_dnsc";

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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Bienvenida renovado", concurso, fecha]],
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
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar el cuestionario de cierre al mail ${this.adps[i].mail}`
      );
      if (solicitaConfirmacion) {
        const nombre = this.adps[i].nombre_corregido.split(" ")[0];
        // const apellido = this.adps[i].apellido_corregido.split(" ")[0];

        const templateParams = {
          nombre_ADP: nombre,
          // email: this.adps[i].mail,
          email: "yersonob@gmail.com",
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
          axios({
            method: "post",
            url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
            data: [["Cuestionario de cierre", concurso, fecha]],
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
    encuestaPercepcion(i) {},
  },

  computed: {
    filtrarADPs() {
      return this.filtroPorConcurso(
        this.filtroPorNombreDeServicio(
          this.filtroPorNombreADP(this.filtroPorEstadoConvenio(this.adps))
        )
      );
    },
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
