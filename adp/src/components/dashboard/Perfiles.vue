<template>
  <b-container>
    <!-- Buscador -->
    <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2">
      <b-col>
        <b-form-group label="Buscar por nombre de concurso:">
          <b-form-input
            placeholder="nombre"
            v-model="concurso"
          ></b-form-input> </b-form-group
      ></b-col>
      <b-col>
        <b-form-group label="Buscar por servicio">
          <b-form-select
            :options="servicios"
            v-model="servicio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Contenido -->
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="6" class="text-start">
          <b-card-body title="Identificación">
            <ul v-for="({ concurso }, i) in adps" :key="i">
              <!-- <li>
                Nombre: {{ adp.nombre_corregido }} {{ adp.apellido_corregido }}
              </li> -->
              <li>{{ i + 1 }} {{ concurso }}</li>
              <!-- <li>
                Fecha de nombramiento: {{ adp.fecha_nombramiento_renovacion }}
              </li>
              <li>Estado en el sistema: {{ adp.estado_adp }}</li>
              <li>Estado de convenio: {{ adp.estado_cd }}</li>
              <li>Nivel y cargo: {{ adp.nivel }} {{ adp.cargo }}</li>
              <li>{{ adp.servicio }}</li>
              <li>{{ adp.ministerio }}</li>
              <li>{{ adp.region }}</li>
              <li>{{ adp.mail }}</li>
              <li>{{ adp.mail_contraparte_cd }}</li>
              <li>{{ adp.mail_contraparte_eval }}</li> -->
            </ul>
          </b-card-body>
        </b-col>
        <!-- <b-col md="6">
          <b-card-body title="Horizontal Card">
            <ul v-for="(adp, i) in adps" :key="i">
              <li>
                Fecha de nombramiento: {{ adp.fecha_nombramiento_renovacion }}
              </li>
              <li>30 días: {{ adp.fecha_propuesta }}</li>
              <li>60 días: {{ adp.fecha_suscripcion }}</li>
              <li>90 días: {{ adp.fecha_comunicacion }}</li>
              <hr />
              <li>{{ adp.eval_semestral_inicio }}</li>
              <li>{{ adp.eval_semestral_auto }}</li>
              <li>{{ adp.eval_semestral_retro }}</li>
              <hr />
              <li>{{ adp.eval_anual_inicio }}</li>
              <li>{{ adp.eval_anual_auto }}</li>
              <li>{{ adp.eval_anual_retro }}</li>
              <li>{{ adp.eval_anual_rex }}</li>
            </ul>
          </b-card-body>
        </b-col> -->
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Perfiles",
  data() {
    return {
      concurso: "",
      servicio: "",
      servicios: [
        { value: "", text: "Seleccione una opción" },
        {
          value: "Servicio Local de Educación Andalién Sur",
          text: "Servicio Local de Educación Andalién Sur",
        },
        {
          value: "Superintendencia de Educación Superior",
          text: "Superintendencia de Educación Superior",
        },
        {
          value: "Servicio Local de Educación Barrancas",
          text: "Servicio Local de Educación Barrancas",
        },
        {
          value: "Servicio Local de Educación Colchagua",
          text: "Servicio Local de Educación Colchagua",
        },
        { value: "Consejo de Rectores", text: "Consejo de Rectores" },
        {
          value: "Servicio Nacional de Educación Pública",
          text: "Dirección de Educación Pública",
        },
      ],
    };
  },
  methods: {
    filtrarPorCategoria(adps) {
      return adps.filter((e) => !e.servicio.indexOf(this.servicio));
    },
    filtrarPorNombre(adps) {
      return adps.filter(
        (e) => !e.concurso.toLowerCase().indexOf(this.concurso.toLowerCase())
      );
    },
  },
  computed: {
    filtros() {
      return this.filtrarPorCategoria(this.filtrarPorNombre(this.adps));
    },
    ...mapState(["adps"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
