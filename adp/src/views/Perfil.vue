<template>
  <div class="home">
    <DatosPersonales :indice="indice" />
  </div>
</template>

<script>
import DatosPersonales from "@/components/perfil/DatosPersonales.vue";

export default {
  name: "Perfil",
  components: {
    DatosPersonales,
  },
  props: {
    indice: { type: String, required: true },
  },
};
</script>
