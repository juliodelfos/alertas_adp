<template>
  <div class="home">
    <Perfiles msg="Welcome to Your Vue.js App" />
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
};
</script>
