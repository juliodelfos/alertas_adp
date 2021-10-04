<template>
  <div class="home">
    <Perfiles :id="id" />
  </div>
</template>

<script>
// @ is an alias to /src
import Perfiles from "@/components/dashboard/Perfiles.vue";

export default {
  name: "PerfilADP",
  components: {
    Perfiles,
  },
  props: {
    id: String,
  },
};
</script>
