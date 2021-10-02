<template>
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
</template>

<script>
export default {
  name: "Filtros",
  data() {
    return {
      servicio: "",
      estadoConvenio: "",
      concurso: "2113",
      nombreADP: "",
      props: ["servicio", "estadoConvenio", "concurso", "nombreADP"],
      //   props: {
      //     servicio: { type: String, required: true },
      //     estadoConvenio: { type: String, required: true },
      //     concurso: { type: String, required: true },
      //     nombreADP: { type: String, required: true },
      //   },
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
};
</script>

<style>
</style>