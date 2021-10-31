<template>
  <div class="home">
    <DatosPersonales :id="id" />
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
    id: String,
  },
};
</script>
