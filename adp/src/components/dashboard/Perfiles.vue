<template>
  <b-container>
    <!-- Buscador -->
    <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2">
      <b-col>
        <!-- <b-form-group label="Buscar por nombre de concurso:">
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
        </b-form-group> -->
      </b-col>
    </b-row>
    <!-- Contenido -->
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="6" class="text-start">
          <select v-model="servicio">
            <option value="">Elige categoría</option>
            <option value="Servicio Local de Educación Andalién Sur">
              Servicio Local de Educación Andalién Sur
            </option>
            <option value="Superintendencia de Educación Superior">
              Superintendencia de Educación Superior
            </option>
            <option value="Servicio Local de Educación Barrancas">
              Servicio Local de Educación Barrancas
            </option>
            <option value="Consejo de Rectores">Consejo de Rectores</option>
          </select>

          <input
            type="text"
            v-model="concurso"
            placeholder="Filtrar por número de concurso"
          />

          <ul>
            <li v-for="(product, i) in filtrarADPs" :key="i">
              ADP: {{ product.concurso }} -{{ product.servicio }}
            </li>
          </ul>
          <!-- <b-card-body title="Identificación">
            <ul v-for="({ concurso }, i) in adps" :key="i">
              <li>
                Nombre: {{ adp.nombre_corregido }} {{ adp.apellido_corregido }}
              </li>
              <li>{{ i + 1 }} {{ concurso }}</li>
              <li>
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
              <li>{{ adp.mail_contraparte_eval }}</li>
            </ul>
          </b-card-body> -->
        </b-col>
        <b-col md="6">
          <!-- <b-card-body title="Horizontal Card">
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
          </b-card-body> -->
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
      // products: [
      //   {
      //     concurso: "2113",
      //     servicio: "Servicio Local de Educación Andalién Sur",
      //     alerta0: "null",
      //     nombre_corregido: "Juan Rafael",
      //     apellido_corregido: "Bravo Miranda",
      //     alerta_cero: "No",
      //   },
      //   {
      //     concurso: "2040",
      //     servicio: "Consejo de Rectores",
      //     alerta0: "null",
      //     nombre_corregido: "Juan Rafael",
      //     apellido_corregido: "Bravo Miranda",
      //     alerta_cero: "No",
      //   },
      //   {
      //     concurso: "3682",
      //     servicio: "Servicio Local de Educación Andalién Sur",
      //   },
      //   {
      //     concurso: "3947",
      //     servicio: "Servicio Local de Educación Barrancas",
      //   },
      //   {
      //     concurso: "3901",
      //     servicio: "Servicio Local de Educación Barrancas",
      //   },
      //   {
      //     concurso: "4019",
      //     servicio: "Superintendencia de Educación Superior",
      //   },
      //   {
      //     concurso: "3951",
      //     servicio: "Superintendencia de Educación Superior",
      //   },
      //   { concurso: "4214", servicio: "Consejo de Rectores" },
      //   {
      //     concurso: "4131",
      //     servicio: "Superintendencia de Educación Superior",
      //   },
      //   { concurso: "4064", servicio: "Consejo de Rectores" },
      // ],
      // servicios: [
      //   { value: "", text: "Seleccione una opción", price: 100 },
      //   {
      //     value: "Servicio Local de Educación Andalién Sur",
      //     text: "Servicio Local de Educación Andalién Sur",
      //     price: 120,
      //   },
      //   {
      //     value: "Superintendencia de Educación Superior",
      //     text: "Superintendencia de Educación Superior",
      //     price: 200,
      //   },
      //   {
      //     value: "Servicio Local de Educación Barrancas",
      //     text: "Servicio Local de Educación Barrancas",
      //     price: 400,
      //   },
      //   {
      //     value: "Servicio Local de Educación Colchagua",
      //     text: "Servicio Local de Educación Colchagua",
      //     price: 500,
      //   },
      //   {
      //     value: "Consejo de Rectores",
      //     text: "Consejo de Rectores",
      //     price: 600,
      //   },
      //   {
      //     value: "Servicio Nacional de Educación Pública",
      //     text: "Dirección de Educación Pública",
      //     price: 700,
      //   },
      // ],
    };
  },
  methods: {
    filtroPorNombreDeServicio: function (adps) {
      return adps.filter((product) => !product.servicio.indexOf(this.servicio));
    },
    filtroPorConcurso: function (adps) {
      return adps.filter((product) => !product.concurso.indexOf(this.concurso));
    },
  },
  computed: {
    filtrarADPs: function () {
      return this.filtroPorConcurso(this.filtroPorNombreDeServicio(this.adps));
    },
    ...mapState(["adps"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
