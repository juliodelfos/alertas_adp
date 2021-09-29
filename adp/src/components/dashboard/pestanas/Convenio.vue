<template>
  <div class="px-4">
    <table class="table table-bordered text-center">
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
            <span class="badge rounded-pill bg-primary text-white"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
          <td>
            {{ adp.fecha_suscripcion | formatDate }}
            <span class="badge rounded-pill bg-primary text-white"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
          <td>
            {{ adp.fecha_comunicacion | formatDate }}
            <span
              class="badge rounded-pill bg-primary text-white cursor"
              @click="addToCalendar(adp.indice)"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark"
              @click="sendEmail(adp.indice)"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span class="badge rounded-pill bg-warning text-dark"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span class="badge rounded-pill bg-warning text-dark"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Convenio",
  methods: {
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
    ...mapState(["adps"]),
  },
};
</script>

<style>
</style>