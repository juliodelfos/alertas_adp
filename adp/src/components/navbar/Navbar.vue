<template>
  <b-navbar toggleable="lg" type="dark" class="px-2">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          ><router-link :to="{ name: 'Inicio' }"
            >Inicio</router-link
          ></b-nav-item
        >
        <b-nav-item
          ><router-link :to="{ name: 'Perfil' }"
            >Perfil</router-link
          ></b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto">
        <RRSS />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped>
</style>