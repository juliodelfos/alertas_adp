<template>
  <b-navbar class="mb-3 px-3" toggleable="lg" type="light" variant="light">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link to="/">Inicio</router-link></b-nav-item>
        <b-nav-item
          ><router-link to="/perfil">Dashboard</router-link></b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto">
        <span to="/perfil" v-if="estado"
          ><b>Estado SICDE:</b> Operativo
          <b-icon icon="check-circle-fill" id="sicdeOperativo"></b-icon
        ></span>
        <span to="/perfil" v-else
          ><b>Estado SICDE:</b> Caído
          <b-icon icon="exclamation-circle-fill" id="sicdeCaido"></b-icon
        ></span>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from "axios";
export default {
  name: "Nav",
  data() {
    return {
      estado: "",
    };
  },
  methods: {
    async estadoSICDE() {
      await axios
        .get(
          "https://v1.nocodeapi.com/yerigagarin/uptime/AUpowmIbIGdzFDkI?monitors=789280592"
        )
        .then((response) => {
          this.estado = response.data.stat;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.estadoSICDE();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#sicdeOperativo {
  color: green;
}

#sicdeCaido {
  color: red;
}
</style>
