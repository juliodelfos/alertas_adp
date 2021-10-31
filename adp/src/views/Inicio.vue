<template>
  <div class="home my-auto">
    <Login />
  </div>
</template>

<script>
import Login from "@/components/inicio/Login.vue";

export default {
  name: "Inicio",
  components: {
    Login,
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

div {
  animation: gradient 15s infinite;
  background-attachment: scroll;
  background-clip: border-box;
  background-color: transparent;
  background-image: linear-gradient(-45deg, #1a4731, #3490dc);
  background-origin: padding-box;
  background-position: 0 0;
  background-repeat: repeat;
  background-size: 200% 200%;
  border: 0 solid #e5e7eb;
  border-image: none 100% 1 0 stretch;
  box-sizing: border-box;
}
</style>