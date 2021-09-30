<template>
  <div>
    <!-- Buscador -->
    <b-row
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
            <!-- Foto de perfil -->
            <b-col md="2" class="text-center my-auto pt-4">
              <!-- :style="{ backgroundImage: 'url(' + adp.img + ')' }" -->
              <img
                :src="adp.img"
                alt="Foto de perfil"
                class="fotoPerfil rounded-circle"
                v-show="adp.img"
              />
            </b-col>
            <b-col md="10">
              <!-- Gráfico -->
              <b-container
                class="pt-4"
                v-show="adp.porcentaje_dias_cargo !== 'Fecha futura'"
              >
                <h3 class="fs-6 text-start">
                  Porcentaje avance año de gestión
                </h3>
                <b-progress
                  :value="adp.porcentaje_dias_anogestion"
                  class="mb-3"
                  height="20px"
                  variant="primary"
                  show-progress
                ></b-progress>

                <h3 class="fs-6 text-start">Porcentaje avance periodo</h3>
                <b-progress
                  :value="adp.porcentaje_dias_cargo"
                  height="20px"
                  show-progress
                  variant="success"
                ></b-progress>
              </b-container>
            </b-col>
          </b-row>

          <!-- Datos básicos -->
          <b-row class="py-4 ps-5">
            <b-col md="6">
              <table class="table table-borderless mb-4">
                <tbody>
                  <tr>
                    <td>
                      <b-icon icon="bag-fill"></b-icon><b> Cargo:</b>
                      {{ adp.cargo }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b-icon icon="calendar2-event-fill"></b-icon
                      ><b> Fecha nombramiento o renovación:</b>
                      {{ adp.fecha_nombramiento_renovacion | formatDate }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b-icon icon="info-square-fill"></b-icon
                      ><b> Estado en el sistema:</b> {{ adp.estado_adp }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b-icon icon="person-badge-fill"></b-icon>
                      <b> Contraparte convenio:</b>
                      <a
                        :href="enviarMailAADP + adp.mail_contraparte_cd"
                        target="_blank"
                      >
                        {{ adp.mail_contraparte_cd }}</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
            <b-col md="6">
              <table class="table table-borderless mb-4">
                <tbody>
                  <tr>
                    <td>
                      <b-icon icon="door-closed-fill"></b-icon><b> Servicio:</b>
                      {{ adp.servicio }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b-icon icon="envelope-fill"></b-icon>
                      <b> Correo:</b>
                      <a
                        :href="
                          enviarMailAADP +
                          adp.mail +
                          cuerpoMail +
                          `Estimada/o ` +
                          adp.nombre_corregido
                        "
                        target="_blank"
                      >
                        {{ adp.mail }}</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td v-if="adp.estado_cd == 'Suscrito'">
                      <b-icon icon="question-octagon-fill"></b-icon
                      ><b> Estado de convenio:</b> {{ adp.estado_cd }}
                      <b-icon
                        icon="check-circle-fill"
                        id="convenioSuscrito"
                      ></b-icon>
                    </td>
                    <td v-else>
                      <b-icon icon="question-octagon-fill"></b-icon
                      ><b> Estado de convenio:</b> {{ adp.estado_cd }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b-icon icon="person-lines-fill"></b-icon>
                      <b> Contraparte evaluación:</b
                      ><a
                        :href="enviarMailAADP + adp.mail_contraparte_eval"
                        target="_blank"
                      >
                        {{ adp.mail_contraparte_eval }}</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>

          <!-- Pestañas -->
          <b-tabs content-class="mt-3" align="center">
            <b-tab title="Convenio de desempeño" active>
              <Convenio
                :fecha_comunicacion="adp.fecha_comunicacion"
                :fecha_propuesta="adp.fecha_propuesta"
                :fecha_suscripcion="adp.fecha_suscripcion"
                @alertaCero="alertaCero(adp.indice)"
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
export default {
  name: "Perfiles",
  components: { Convenio, Semestrales, Anuales, Otras },
  data() {
    return {
      nombreADP: "Yerson",
      apellidoADP: "Olivares",
      email: "yersonob@gmail.com",
      cargoADP: "El Mejor, básiscamente",
      nombramientoADP: "Fecha1",
      suscripciónADP: "Fecha2",
      comunicacionADP: "Fecha3",
      animate: true,
      servicio: "",
      estadoConvenio: "",
      concurso: "2113",
      nombreADP: "",
      enviarMailAADP: "https://mail.google.com/mail/?view=cm&source=mailto&to=",
      cuerpoMail: "&body=",
      mail: {
        senderName: "",
        senderEmail: "",
        to: "",
        subject: "",
        template: "",
        deliveryTime: "",
        name: "",
      },
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
    // Filtros
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
    // APIs
    alertaCero() {
      try {
        emailjs.sendForm(
          "gmail",
          "alerta0_nombrado",
          "user_j03eIIBx2tfg0roipyWbX",
          {
            nombreADP: this.nombreADP,
            apellidoADP: this.apellidoADP,
            email: this.email,
            cargoADP: this.cargoADP,
            nombramientoADP: this.nombramientoADP,
            suscripciónADP: this.suscripciónADP,
            comunicacionADP: this.comunicacionADP,
          }
        );
      } catch (error) {
        console.log({ error });
      }
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

.fotoPerfil {
  height: 7rem;
  width: 7rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

#convenioSuscrito {
  color: green;
}

.row {
  padding: 0;
  margin: 0;
}
</style>
