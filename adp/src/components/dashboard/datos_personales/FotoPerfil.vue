<template>
  <div>
    <!-- :style="{ backgroundImage: 'url(' + adp.img + ')' }" -->
    <img
      :src="img"
      alt="Foto de perfil"
      class="fotoPerfil rounded-circle"
      v-show="img"
    />
  </div>
</template>

<script>
export default {
  name: "FotoPerfil",
  props: {
    img: { type: String, required: true },
  },
};
</script>

<style>
</style>