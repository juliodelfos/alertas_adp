<template>
  <div>
    <b-row id="noMargin">
      <b-col cols="1" class="sinPadding bg-primary">
        <Side />
      </b-col>

      <b-col cols="11" class="sinPadding">
        <router-view />
      </b-col>
    </b-row>
    <!-- <Nav />
    <div id="principal">
      <router-view />
    </div> -->
  </div>
</template>

<script>
import Nav from "@/components/nav/Nav.vue";
import Side from "@/components/nav/Side.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components: {
    Nav,
    Side,
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
// @import "./bootswatch/dist/darkly/bootstrap.min.css";
// @import "@/assets/style/_bootswatch.scss";
.fotoPerfil {
  height: 7rem;
  width: 7rem;
}

.fotoPerfilPequena {
  height: 5rem;
  width: 5rem;
}

#convenioSuscrito {
  color: green;
}

.cursor {
  cursor: copy;
}

.sinPadding {
  padding: 0 !important;
}

#noMargin {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
</style>
