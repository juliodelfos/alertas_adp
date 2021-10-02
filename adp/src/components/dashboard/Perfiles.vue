<template>
  <div>
    <!-- Buscador -->
    <!-- <Filtros
      :servicio="servicio"
      :estadoConvenio="estadoConvenio"
      :concurso="concurso"
      :nombreADP="nombreADP"
      @alertaCero="alertaCero(adp.indice)"
      @alertaSesenta="alertaSesenta(adp.indice)"
      @alertaNoventa="alertaNoventa(adp.indice)"
      @addToCalendar="addToCalendar(adp.indice)"
    /> -->
    <b-row
      id="filtros"
      cols="1"
      cols-sm="1"
      cols-md="4"
      cols-lg="4"
      class="mb-4 pb-4 pt-3 px-3 bg-primary text-white shadow"
      rounded="bottom"
    >
      <b-col>
        <b-form-group>
          <b-form-input
            placeholder="Número de concurso"
            v-model="concurso"
          ></b-form-input> </b-form-group
      ></b-col>
      <b-col>
        <b-form-group>
          <b-form-select
            :options="servicios"
            v-model="servicio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-select
            :options="estadosConvenios"
            v-model="estadoConvenio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-input
            placeholder="Nombre ADP"
            v-model="nombreADP"
          ></b-form-input> </b-form-group
      ></b-col>
    </b-row>

    <b-container>
      <!-- Cards -->
      <b-card
        no-body
        class="overflow-hidden shadow mb-4"
        v-for="(adp, i) in filtrarADPs"
        :key="i"
      >
        <b-row no-gutters>
          <div class="bg-primary text-white text-center pt-3 pb-2">
            <h1 class="fs-4">
              <b-icon icon="person-circle"></b-icon>
              {{ adp.nombre_corregido.split(" ")[0] }}
              {{ adp.apellido_corregido.split(" ")[0] }}
              ·
              {{ adp.concurso }}
            </h1>
          </div>

          <!-- Foto y gráfico -->
          <b-row class="pb-4">
            <b-col md="2" class="text-center my-auto pt-4">
              <FotoPerfil :img="adp.img" />
            </b-col>
            <b-col md="10">
              <Grafico
                :porcentaje_dias_cargo="adp.porcentaje_dias_cargo"
                :porcentaje_dias_anogestion="adp.porcentaje_dias_anogestion"
              />
            </b-col>
          </b-row>

          <!-- Datos básicos -->
          <Datos
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
                :fecha_comunicacion="adp.fecha_comunicacion"
                :fecha_propuesta="adp.fecha_propuesta"
                :fecha_suscripcion="adp.fecha_suscripcion"
                @alertaCero="alertaCero()"
                @alertaSesenta="alertaSesenta(adp.indice)"
                @alertaNoventa="alertaNoventa(adp.indice)"
                @addToCalendar="addToCalendar(adp.indice)"
              />
            </b-tab>
            <b-tab title="Evaluaciones semestrales">
              <Semestrales />
            </b-tab>
            <b-tab title="Evaluaciones anuales">
              <Anuales />
            </b-tab>
            <b-tab title="Otras comunicaciones">
              <Otras />
            </b-tab>
          </b-tabs>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      // Inicio EmailJS
      nombre_ADP: "Yerson",
      apellido_ADP: "Olivares",
      cargo_ADP: "El Mejor, básicamente",
      email: "yersonob@gmail.com",
      nombramiento_ADP: "Fecha1",
      suscripción_ADP: "Fecha2",
      comunicacion_ADP: "Fecha3",
      //
      // Fin EmailJS
      //
      servicio: "",
      estadoConvenio: "",
      concurso: "2113",
      nombreADP: "",
      enviarMailAADP: "https://mail.google.com/mail/?view=cm&source=mailto&to=",
      cuerpoMail: "&body=",
      estadosConvenios: [
        { value: "", text: "Selecciona un estado" },
        { value: "Suscrito", text: "Suscrito" },
        { value: "Elaboración Servicio", text: "Elaboración Servicio" },
        { value: "Servicio Firma", text: "Servicio Firma" },
        { value: "Esperando Firma", text: "Esperando Firma" },
        { value: "DNSC Revisión", text: "DNSC Revisión" },
        { value: "Elaboración Ministerio", text: "Elaboración Ministerio" },
        {
          value: "Servicio Revisión de Observaciones",
          text: "Servicio Revisión de Observaciones",
        },
        {
          value: "Ministerio Revisión de Observaciones",
          text: "Ministerio Revisión de Observaciones",
        },
        {
          value: "Ministerio Resolución",
          text: "Ministerio Revisión de Observaciones",
        },
      ],
      servicios: [
        { value: "", text: "Selecciona un servicio" },
        {
          value: "Agencia de Calidad de la Educación",
          text: "Agencia de Calidad de la Educación",
        },
        {
          value: "Consejo de Rectores",
          text: "Consejo de Rectores",
        },
        {
          value: "Junta Nacional de Auxilio Escolar y Becas",
          text: "Junta Nacional de Auxilio Escolar y Becas",
        },
        {
          value: "Junta Nacional de Jardines Infantiles",
          text: "Junta Nacional de Jardines Infantiles",
        },
        {
          value: "Servicio Local de Educación Andalién Sur",
          text: "Servicio Local de Educación Andalién Sur",
        },
        {
          value: "Servicio Local de Educación Atacama",
          text: "Servicio Local de Educación Atacama",
        },
        {
          value: "Servicio Local de Educación Barrancas",
          text: "Servicio Local de Educación Barrancas",
        },
        {
          value: "Servicio Local de Educación Chinchorro",
          text: "Servicio Local de Educación Chinchorro",
        },
        {
          value: "Servicio Local de Educación Colchagua",
          text: "Servicio Local de Educación Colchagua",
        },
        {
          value: "Servicio Local de Educación Costa Araucanía",
          text: "Servicio Local de Educación Costa Araucanía",
        },
        {
          value: "Servicio Local de Educación Gabriela Mistral",
          text: "Servicio Local de Educación Gabriela Mistral",
        },
        {
          value: "Servicio Local de Educación Huasco",
          text: "Servicio Local de Educación Huasco",
        },
        {
          value: "Servicio Local de Educación Llanquihue",
          text: "Servicio Local de Educación Llanquihue",
        },
        {
          value: "Servicio Local de Educación Puerto Cordillera",
          text: "Servicio Local de Educación Puerto Cordillera",
        },
        {
          value: "Servicio Local de Educación Valparaíso",
          text: "Servicio Local de Educación Valparaíso",
        },
        {
          value: "Servicio Nacional de Educación Pública",
          text: "Dirección de Educación Pública",
        },
        {
          value: "Superintendencia de Educación",
          text: "Superintendencia de Educación",
        },
        {
          value: "Superintendencia de Educación Superior",
          text: "Superintendencia de Educación Superior",
        },
      ],
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
    //Fin Filtros
    //

    // Inicio APIs
    alertaCero() {
      const templateParams = {
        nombre_ADP: this.nombre_ADP,
        apellido_ADP: this.apellido_ADP,
        cargo_ADP: this.cargo_ADP,
        email: this.email,
        nombramiento_ADP: this.nombramiento_ADP,
        suscripción_ADP: this.suscripción_ADP,
        comunicacion_ADP: this.comunicacion_ADP,
      };
      const userID = "user_j03eIIBx2tfg0roipyWbX";
      const templateID = "alerta0_nombrado";
      const serviceID = "gmail_dnsc";
      emailjs.send(serviceID, templateID, templateParams, userID).then(
        (result) => {
          console.log("SUCCESS!", result.text);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    },
    addToCalendar(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/kPSHlVqrfCmjOchV/event?maxAttendees=1&sendNotifications=true&sendUpdates=none",
        params: {},
        data: {
          summary: `Noventa días de ${this.adps[i].nombre_corregido} ${this.adps[i].apellido_corregido} [${this.adps[i].concurso}]`,
          description: `El concurso ${this.adps[i].concurso} se encuentra próximo al cumplimiento de los 90 días.`,
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
  // created() {
  //   this.concurso = this.concursoMasActual;
  // },
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
}

.cursor {
  cursor: copy;
}

.row {
  padding: 0;
  margin: 0;
}
</style>
