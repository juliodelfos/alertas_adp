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
              <div class="px-4">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Propuesta</th>
                      <th scope="col">Suscripción</th>
                      <th scope="col">Comunicación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {{ adp.fecha_propuesta | formatDate }}
                      </td>
                      <td>
                        {{ adp.fecha_suscripcion | formatDate }}
                      </td>
                      <td>{{ adp.fecha_comunicacion | formatDate }}</td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="badge rounded-pill bg-warning text-dark"
                          @click="sendEmail(adp.indice)"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span
                          class="
                            badge
                            rounded-pill
                            bg-primary
                            text-white
                            cursor
                          "
                          @click="addToCalendar(adp.indice)"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
            <b-tab title="Evaluaciones semestrales">
              <div class="px-4">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Inicio</th>
                      <th scope="col">Autoevaluación</th>
                      <th scope="col">Retroalimentación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ adp.eval_semestral_inicio | formatDate }}</td>
                      <td>
                        {{ adp.eval_semestral_auto | formatDate }}
                      </td>
                      <td>{{ adp.eval_semestral_retro | formatDate }}</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
            <b-tab title="Evaluaciones anuales">
              <div class="px-4">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Inicio</th>
                      <th scope="col">Autoevaluación</th>
                      <th scope="col">Retroalimentación</th>
                      <th scope="col">Resolución</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {{ adp.eval_anual_inicio | formatDate }}
                      </td>
                      <td>
                        {{ adp.eval_anual_auto | formatDate }}
                      </td>
                      <td>{{ adp.eval_anual_retro | formatDate }}</td>
                      <td>{{ adp.eval_anual_rex | formatDate }}</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span
                          class="
                            badge
                            rounded-pill
                            bg-primary
                            text-white
                            cursor
                          "
                          @click="addToCalendar(adp.indice)"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span
                          class="
                            badge
                            rounded-pill
                            bg-primary
                            text-white
                            cursor
                          "
                          @click="addToCalendar(adp.indice)"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
            <b-tab title="Otras comunicaciones">
              <div class="px-4">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Clave SICDE</th>
                      <th scope="col">Clave APP</th>
                      <th scope="col">Bienvenida</th>
                      <th scope="col">Bienvenida Renovado</th>
                      <th scope="col">Encuesta de cierre</th>
                      <th scope="col">Encuesta percepción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {{ adp.eval_anual_inicio | formatDate }}
                      </td>
                      <td>
                        {{ adp.eval_anual_auto | formatDate }}
                      </td>
                      <td>{{ adp.eval_anual_retro | formatDate }}</td>
                      <td>{{ adp.eval_anual_rex | formatDate }}</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-warning text-dark"
                          ><b-icon icon="envelope-fill"></b-icon> Enviar
                          alerta</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span class="badge rounded-pill bg-primary text-white"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span
                          class="
                            badge
                            rounded-pill
                            bg-primary
                            text-white
                            cursor
                          "
                          @click="addToCalendar(adp.indice)"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                      <td>
                        <span
                          class="
                            badge
                            rounded-pill
                            bg-primary
                            text-white
                            cursor
                          "
                          @click="addToCalendar(adp.indice)"
                          ><b-icon icon="calendar"></b-icon> Añadir a calendario
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
          </b-tabs>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Perfiles",
  data() {
    return {
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
    sendEmail(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/mailgun/MWpAmzASqYMhVxwW/send",
        params: {
          senderName: "Yerson",
          senderEmail: "yolivares@serviciocivil.cl",
          to: this.adps[i].mail,
          subject: "Hola" + this.adps[i].nombre_corregido,
          template: "prueba",
        },
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
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
