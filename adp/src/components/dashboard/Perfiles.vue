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
              @addToCalendar="addToCalendar(adp.indice)"
            />
            <div class="text-center pt-3 pb-4 fs-5 fw-bold" v-else>
              Convenio suscrito
              <b-icon icon="check-circle-fill" id="convenioSuscrito"></b-icon>
            </div>
          </b-tab>
          <b-tab title="Evaluaciones semestrales">
            <Semestrales
              :eval_semestral_inicio="adp.eval_semestral_inicio"
              :eval_semestral_auto="adp.eval_semestral_auto"
              :eval_semestral_retro="adp.eval_semestral_retro"
              :mail="adp.mail"
              :nombre_corregido="adp.nombre_corregido"
              :apellido_corregido="adp.apellido_corregido"
              @inicioEvalSemestral="inicioEvalSemestral(adp.indice)"
              @autoEvalSemestral="autoEvalSemestral(adp.indice)"
              @retroEvalSemestral="retroEvalSemestral(adp.indice)"
              @anadirCalendario="anadirCalendario(adp.indice)"
            />
          </b-tab>
          <b-tab title="Evaluaciones anuales">
            <Anuales />
          </b-tab>
          <b-tab title="Otras comunicaciones">
            <Otras />
          </b-tab>
        </b-tabs>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Vue from "vue";
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
    //Fin Filtros

    // Inicio APIs
    alertaCero(i) {
      const solicitaConfirmacion = confirm(
        `¿Seguro que quieres enviar la Alerta Cero al mail ${this.adps[i].mail_contraparte_cd}`
      );
      if (solicitaConfirmacion) {
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
        const templateID = "alerta0_nombrado";
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
          data: [["Alerta Cero primer periodo", concurso, fecha]],
        })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));

        // Vue.notify({
        //   type: "success",
        //   text: "Correo enviado",
        // });
        console.log("Enviado");
      } else {
        // Vue.notify({
        //   type: "warn",
        //   text: "Correo no enviado",
        // });
        console.log("No enviado");
      }
    },
    alertaCeroRenovado(i) {
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
          this.adps[i].fecha_nombramiento_renovacion.split("T00:00:00.000Z")[0]
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
        } 08:00&title=Comunicación convenio ${this.adps[i].nombre_corregido} ${
          this.adps[i].apellido_corregido
        } (90 días)&timezone=America/Santiago">Añadir al Calendario</a>`,
      };

      const userID = "user_j03eIIBx2tfg0roipyWbX";
      const templateID = "alerta0_renovado";
      const serviceID = "gmail_dnsc";

      emailjs.send(serviceID, templateID, templateParams, userID).then(
        (result) => console.log(result.text),
        (error) => console.log(error.text)
      );

      //Se registra correo en planilla de Google 'Correos enviados por el sistema de alertas'
      const fecha = new Date();
      const concurso = this.adps[i].concurso;
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
        data: [["Alerta Cero Renovado", concurso, fecha]],
      })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    alertaSesenta(i) {
      const fechaSuscripcion = this.adps[i].fecha_suscripcion
        .split("T00:00:00.000Z")[0]
        .split("-");
      const suscripcion_ADP = `${fechaSuscripcion[2]}/${fechaSuscripcion[1]}/${fechaSuscripcion[0]}`;
      const nombre_ADP = this.adps[i].nombre_corregido;
      const apellido_ADP = this.adps[i].apellido_corregido;
      const cargo_ADP = this.adps[i].cargo;
      const email = this.adps[i].mail_contraparte_cd;

      const templateParams = {
        asunto: `Convenio de desempeño pendiente`,
        email: email,
        mensaje: `Estimada Contraparte,Junto con saludar, y en virtud del nombramiento de ${nombre_ADP} ${apellido_ADP}, ${cargo_ADP}, informado recientemente, recordamos que es necesario elaborar la propuesta de convenio de desempeño la cual debe contar con la aprobación del Servicio Civil a través del Sistema Informático de Convenios de Desempeño (SICDE).
La fecha máxima de suscripción es el ${suscripcion_ADP}. En caso de tener alguna diferencia con la fecha, por favor infórmanos respondiendo este correo a fin de evitar problemas posteriores en el sistema.`,
      };

      const userID = "user_j03eIIBx2tfg0roipyWbX";
      const templateID = "general";
      const serviceID = "gmail_dnsc";

      const emailSaliente = emailjs
        .send(serviceID, templateID, templateParams, userID)
        .then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );
    },
    addToCalendar(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/kPSHlVqrfCmjOchV/event?maxAttendees=1&sendNotifications=true&sendUpdates=none",
        params: {},
        data: {
          summary: `Treinta días desde el nombramiento de ${this.adps[i].nombre_corregido} ${this.adps[i].apellido_corregido} [${this.adps[i].concurso}]`,
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
          attendees: [
            {
              email: "yolivares@serviciocivil.cl",
            },
          ],
        },
      })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    // alertaNoventa() {
    //   Vue.notify({
    //     type: "warn",
    //     text: "Correo no enviado",
    //   });
    //   console.log("Ah?");
    // },
  },

  computed: {
    filtrarADPs() {
      return this.filtroPorConcurso(
        this.filtroPorNombreDeServicio(
          this.filtroPorNombreADP(this.filtroPorEstadoConvenio(this.adps))
        )
      );
    },
    concursoMasActual() {
      const arregloConcursos = this.adps;
      return Math.max.apply(
        Math,
        arregloConcursos.map((n) => {
          return n.concurso;
        })
      );
    },
    ...mapState(["adps"]),
  },
  created() {
    // this.concurso = this.concursoMasActual;
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
