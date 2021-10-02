<template>
  <b-container class="pt-4" v-show="porcentaje_dias_cargo !== 'Fecha futura'">
    <h3 class="fs-6 text-start">Porcentaje avance año de gestión</h3>
    <b-progress
      :value="porcentaje_dias_anogestion"
      class="mb-3"
      height="20px"
      variant="primary"
      show-progress
    ></b-progress>

    <h3 class="fs-6 text-start">Porcentaje avance periodo</h3>
    <b-progress
      :value="porcentaje_dias_cargo"
      height="20px"
      show-progress
      variant="success"
    ></b-progress>
  </b-container>
</template>

<script>
export default {
  name: "Grafico",
  props: {
    porcentaje_dias_cargo: { type: Number, required: true },
    porcentaje_dias_anogestion: { type: Number, required: true },
  },
};
</script>

<style>
</style>