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
                v-if="adp.estado_cd !== 'Suscrito'"
                :fecha_comunicacion="adp.fecha_comunicacion"
                :fecha_propuesta="adp.fecha_propuesta"
                :fecha_suscripcion="adp.fecha_suscripcion"
                @alertaCero="alertaCero(adp.indice)"
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
      </b-card>
    </b-container>
  </div>
</template>

<script>
// import { mapState } from "vuex";
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
      servicio: "",
      estadoConvenio: "",
      concurso: "3947",
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
      adps: [
        {
          concurso: "3947",
          ministerio: "Ministerio de Educación",
          servicio: "Junta Nacional de Auxilio Escolar y Becas",
          region: "Región de la Araucanía",
          nombre: "JORGE ALEJANDRO",
          apellido: "ARIAS HORN",
          mail: "yersonob@gmail.com",
          cargo: "Director/a Regional Araucanía",
          nivel: "II",
          fecha_nombramiento: "2018-07-01T00:00:00.000Z",
          estado_adp: "Renovado (segundo periodo)",
          sexo: "M",
          estado_cd: "Servicio Firma",
          rut: "8277408-4",
          alerta0: "4 jul 2018",
          img: "https://firebasestorage.googleapis.com/v0/b/dnsc-ccaf2.appspot.com/o/Fotos%20ADP%2F3947%20-%20Alejandro%20Arias.jpg?alt=media&token=704c41cc-6dcb-461a-b71e-5816e4d51bc1",
          indice: 0,
          nombre_corregido: "Jorge Alejandro",
          apellido_corregido: "Arias Horn",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yerson.o.b@gmail.com",
          mail_contraparte_eval: "yerson.o.b@gmail.com",
          fecha_nombramiento_renovacion: "2021-07-02T00:00:00.000Z",
          fecha_propuesta: "2021-08-01T00:00:00.000Z",
          fecha_suscripcion: "2021-08-31T00:00:00.000Z",
          fecha_comunicacion: "2021-11-11T00:00:00.000Z",
          eval_semestral_inicio: "2022-01-02T00:00:00.000Z",
          eval_semestral_auto: "2022-02-02T00:00:00.000Z",
          eval_semestral_retro: "2022-03-04T00:00:00.000Z",
          eval_anual_inicio: "2022-07-02T00:00:00.000Z",
          eval_anual_auto: "2022-08-02T00:00:00.000Z",
          eval_anual_retro: "2022-09-01T00:00:00.000Z",
          eval_anual_rex: "2022-09-08T00:00:00.000Z",
          porcentaje_dias_cargo: 8.394160583941606,
          porcentaje_dias_anogestion: 25.205479452054796,
        },
        {
          concurso: "3901",
          ministerio: "Ministerio de Educación",
          servicio: "Junta Nacional de Jardines Infantiles",
          region: "Región de la Araucanía",
          nombre: "JUAN PABLO GONZALO",
          apellido: "ORLANDINI RETAMAL",
          mail: "yersonob@gmail.com",
          cargo: "Director/a Regional, Región de la Araucanía",
          nivel: "II",
          fecha_nombramiento: "2018-08-13T00:00:00.000Z",
          estado_adp: "Renovado (segundo periodo)",
          sexo: "M",
          estado_cd: "Elaboración Servicio",
          rut: "8338250-3",
          alerta0: "8 ago 2018",
          img: "https://firebasestorage.googleapis.com/v0/b/dnsc-ccaf2.appspot.com/o/Fotos%20ADP%2F3901%20-%20Juan%20Pablo%20Orlandini.jpg?alt=media&token=72d8c907-398f-4870-b828-ceddfe9daba4",
          indice: 1,
          nombre_corregido: "Juan Pablo Gonzalo",
          apellido_corregido: "Orlandini Retamal",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yerson.o.b@gmail.com",
          mail_contraparte_eval: "yerson.o.b@gmail.com",
          fecha_nombramiento_renovacion: "2021-08-14T00:00:00.000Z",
          fecha_propuesta: "2021-09-13T00:00:00.000Z",
          fecha_suscripcion: "2021-10-13T00:00:00.000Z",
          fecha_comunicacion: "2021-12-23T00:00:00.000Z",
          eval_semestral_inicio: "2022-02-14T00:00:00.000Z",
          eval_semestral_auto: "2022-03-14T00:00:00.000Z",
          eval_semestral_retro: "2022-04-13T00:00:00.000Z",
          eval_anual_inicio: "2022-08-14T00:00:00.000Z",
          eval_anual_auto: "2022-09-14T00:00:00.000Z",
          eval_anual_retro: "2022-10-14T00:00:00.000Z",
          eval_anual_rex: "2022-10-21T00:00:00.000Z",
          porcentaje_dias_cargo: 4.470802919708029,
          porcentaje_dias_anogestion: 13.424657534246576,
        },
        {
          concurso: "4019",
          ministerio: "Ministerio de Educación",
          servicio: "Junta Nacional de Jardines Infantiles",
          region: "Región Metropolitana de Santiago",
          nombre: "ADRIANA AMELIA",
          apellido: "GAETE SOMARRIVA",
          mail: "yersonob@gmail.com",
          cargo: "Vicepresidente/a Ejecutivo/a",
          nivel: "I",
          fecha_nombramiento: "2018-08-13T00:00:00.000Z",
          estado_adp: "Renovado (segundo periodo)",
          sexo: "F",
          estado_cd: "Suscrito",
          rut: "7018718-3",
          alerta0: "2018-09-03T00:00:00.000Z",
          img: "https://firebasestorage.googleapis.com/v0/b/dnsc-ccaf2.appspot.com/o/Fotos%20ADP%2F4019%20-%20Adriana%20Gaete.jpg?alt=media&token=bc0fba0e-800a-4967-a00a-819bdd0b9e07",
          indice: 2,
          nombre_corregido: "Adriana Amelia",
          apellido_corregido: "Gaete Somarriva",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yerson.o.b@gmail.com",
          mail_contraparte_eval: "yerson.o.b@gmail.com",
          fecha_nombramiento_renovacion: "2021-08-14T00:00:00.000Z",
          fecha_propuesta: "2021-09-13T00:00:00.000Z",
          fecha_suscripcion: "2021-10-13T00:00:00.000Z",
          fecha_comunicacion: "2021-12-23T00:00:00.000Z",
          eval_semestral_inicio: "No aplica",
          eval_semestral_auto: "No aplica",
          eval_semestral_retro: "No aplica",
          eval_anual_inicio: "2022-08-14T00:00:00.000Z",
          eval_anual_auto: "2022-09-14T00:00:00.000Z",
          eval_anual_retro: "2022-10-14T00:00:00.000Z",
          eval_anual_rex: "2022-10-21T00:00:00.000Z",
          porcentaje_dias_cargo: 4.470802919708029,
          porcentaje_dias_anogestion: 13.424657534246576,
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
    alertaCero(i) {
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
      };

      const userID = "user_j03eIIBx2tfg0roipyWbX";
      const templateID = "alerta0_nombrado";
      const serviceID = "gmail_dnsc";
      emailjs.send(serviceID, templateID, templateParams, userID).then(
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
    // ...mapState(["adps"]),
  },
  // created() {
  // this.concurso = this.concursoMasActual;
  // },
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
