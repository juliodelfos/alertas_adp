<template>
  <b-row class="py-4 ps-5">
    <b-col md="6">
      <table class="table table-borderless mb-4">
        <tbody>
          <tr>
            <td>
              <b-icon icon="bag-fill"></b-icon><b> Cargo:</b>
              {{ cargo }}
            </td>
          </tr>
          <tr>
            <td>
              <b-icon icon="calendar2-event-fill"></b-icon
              ><b> Fecha nombramiento o renovación:</b>
              {{ fecha_nombramiento_renovacion | formatDate }}
            </td>
          </tr>
          <tr>
            <td>
              <b-icon icon="info-square-fill"></b-icon
              ><b> Estado en el sistema:</b> {{ estado_adp }}
            </td>
          </tr>
          <tr>
            <td>
              <b-icon icon="person-badge-fill"></b-icon>
              <b> Contraparte convenio: </b>
              <a
                :href="`https://mail.google.com/mail/?view=cm&source=mailto&to=${mail_contraparte_cd}&body=Estimada/o,`"
                target="_blank"
                >{{ mail_contraparte_cd }}</a
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
              {{ servicio }}
            </td>
          </tr>
          <tr v-if="mail !== 'null'">
            <td>
              <b-icon icon="envelope-fill"></b-icon>
              <b> Correo:</b>
              <a
                :href="`https://mail.google.com/mail/?view=cm&source=mailto&to=${mail}&body=Estimada/o Directiva/o,`"
                target="_blank"
              >
                {{ mail }}</a
              >
            </td>
          </tr>
          <tr v-else>
            <td>
              <b-icon icon="envelope-fill"></b-icon>
              <b> Correo:</b>
              <a
                :href="`https://mail.google.com/mail/?view=cm&source=mailto&to=${mail_contraparte_cd}&su=Servicio Civil - Solicita correo institucional de ${nombre.charAt(0)}${nombre.split(' ')[0].slice(1).toLowerCase()} ${apellido.charAt(0)}${apellido.split(' ')[0].slice(1).toLowerCase()}&body=Estimada Contraparte,%0D%0A%0D%0AJunto con saludar, solicito hacer envío de correo institucional de ${nombre.charAt(0)}${nombre.split(' ')[0].slice(1).toLowerCase()} ${apellido.charAt(0)}${apellido.split(' ')[0].slice(1).toLowerCase()}, ${cargo}, ${servicio}.%0D%0A%0D%0AMuchas gracias`"
                target="_blank"
              >
                Solicitar correo a contraparte</a
              >
            </td>
          </tr>
          <tr>
            <td v-if="estado_cd == 'Suscrito'">
              <b-icon icon="question-octagon-fill"></b-icon
              ><b> Estado de convenio:</b> {{ estado_cd }}
              <b-icon icon="check-circle-fill" id="convenioSuscrito"></b-icon>
            </td>
            <td v-else-if="estado_cd == 'null'">
              <b-icon icon="question-octagon-fill"></b-icon
              ><b> Estado de convenio:</b> Iniciar expediente
              <b-icon icon="cone-striped" id="convenioNulo"></b-icon>
            </td>
            <td v-else>
              <b-icon icon="question-octagon-fill"></b-icon
              ><b> Estado de convenio:</b> {{ estado_cd }}
            </td>
          </tr>
          <tr>
            <td>
              <b-icon icon="person-lines-fill"></b-icon>
              <b> Contraparte evaluación: </b>
              <a
                :href="`https://mail.google.com/mail/?view=cm&source=mailto&to=${mail_contraparte_eval}&body=Estimada/o,`"
                target="_blank"
              >
                {{ mail_contraparte_eval }}</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Datos",
  props: {
    cargo: { type: String, required: true },
    fecha_nombramiento_renovacion: { type: String, required: true },
    estado_adp: { type: String, required: true },
    mail: { type: String, required: true },
    mail_contraparte_cd: { type: String, required: true },
    mail_contraparte_eval: { type: String, required: true },
    estado_cd: { type: String, required: true },
    servicio: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
  },
};
</script>