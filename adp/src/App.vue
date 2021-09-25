<template>
  <div id="app">
    <Nav/>
    <div id="principal">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components: {
    Nav
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetch_Adp"]),
    fetchAdp() {
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbxOVp8dMaTZYznfrzAvO4g8Lj_Fo3k6MUGRv806R2VVljJAjnZj9_pbtisUce3OV-PUhA/exec"
        )
        .then((response) => {
          this.fetch_Adp(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchAdp();
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
