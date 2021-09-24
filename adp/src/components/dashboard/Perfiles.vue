<template>
  <b-container>
    <!-- Buscador -->
    <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2">
      <b-col>
        <b-form-group label="Buscar por número de concurso:">
          <b-form-input
            placeholder="Número de concurso"
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
    <b-card
      no-body
      class="overflow-hidden"
      v-for="(adp, i) in filtrarADPs"
      :key="i"
    >
      <b-row no-gutters>
        <b-col md="6" class="text-start">
          <b-card-body title="Identificación">
            <ul>
              <li>
                Nombre: {{ adp.nombre_corregido }}
                {{ adp.apellido_corregido }}
              </li>
              <li>{{ i + 1 }} {{ adp.concurso }}</li>
              <li>
                Fecha de nombramiento:
                {{ adp.fecha_nombramiento_renovacion | formatDate }}
              </li>
              <li>Estado en el sistema: {{ adp.estado_adp }}</li>
              <li>Estado de convenio: {{ adp.estado_cd }}</li>
              <li>Nivel y cargo: {{ adp.nivel }} {{ adp.cargo }}</li>
              <li>{{ adp.servicio }}</li>
              <li>{{ adp.ministerio }}</li>
              <li>{{ adp.region }}</li>
              <li>{{ adp.mail }}</li>
              <li>{{ adp.mail_contraparte_cd }}</li>
              <li>{{ adp.mail_contraparte_eval }}</li>
            </ul>
          </b-card-body>
        </b-col>
        <b-col md="6">
          <b-card-body title="Fechas">
            <ul>
              <li>
                Fecha de nombramiento:
                {{ adp.fecha_nombramiento_renovacion | formatDate }}
              </li>
              <li>30 días: {{ adp.fecha_propuesta | formatDate }}</li>
              <li>60 días: {{ adp.fecha_suscripcion | formatDate }}</li>
              <li>90 días: {{ adp.fecha_comunicacion | formatDate }}</li>
              <hr />
              <li>{{ adp.eval_semestral_inicio | formatDate }}</li>
              <li>{{ adp.eval_semestral_auto | formatDate }}</li>
              <li>{{ adp.eval_semestral_retro | formatDate }}</li>
              <hr />
              <li>{{ adp.eval_anual_inicio | formatDate }}</li>
              <li>{{ adp.eval_anual_auto | formatDate }}</li>
              <li>{{ adp.eval_anual_retro | formatDate }}</li>
              <li>{{ adp.eval_anual_rex | formatDate }}</li>
            </ul>
          </b-card-body>
        </b-col>
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
      servicio: "",
      concurso: "",
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
        {
          value: "Consejo de Rectores",
          text: "Consejo de Rectores",
        },
        {
          value: "Servicio Nacional de Educación Pública",
          text: "Dirección de Educación Pública",
        },
      ],
    };
  },
  methods: {
    filtroPorNombreDeServicio(adps) {
      return adps.filter((adp) => !adp.servicio.indexOf(this.servicio));
    },
    filtroPorConcurso(adps) {
      return adps.filter((adp) => !adp.concurso.indexOf(this.concurso));
    },
  },
  computed: {
    filtrarADPs() {
      return this.filtroPorConcurso(this.filtroPorNombreDeServicio(this.adps));
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
    this.concurso = this.concursoMasActual;
  },
};
</script>

<style scoped lang="scss">
</style>
