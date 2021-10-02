<template>
  <div>
    <Nav/>
    <div id="principal">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/nav/Nav.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components: {
    Nav
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

#convenioSuscrito {
  color: green;
}
</style>
