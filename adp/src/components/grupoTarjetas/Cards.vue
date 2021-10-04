<template>
  <div class="d-none d-lg-block">
    <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="3" class="mt-4">
      <b-col
        v-for="(
          {
            nombre_corregido,
            apellido_corregido,
            cargo,
            concurso,
            estado_cd,
            img,
          },
          i
        ) in adps"
        :key="i"
        no-gutters
        class="mb-2"
      >
        <b-card tag="article" class="mb-2 shadow">
          <b-row class="pb-4">
            <b-col id="firstColumn" md="3" class="sinPadding text-center">
              <b-img :src="img" class="mt-1 rounded-circle"></b-img>
            </b-col>
            <b-col md="9" class="my-auto sinPadding">
              <h5>
                {{ nombre_corregido.split(" ")[0] }}
                {{ apellido_corregido }}
              </h5>
              <h5 class="text-muted fs-6">{{ cargo }}</h5>
            </b-col>
          </b-row>

          <b-card-text>
            <b-row class="text-start">
              <b-col md="3">{{ concurso }}</b-col>
              <b-col md="9">{{ estado_cd }}</b-col>
            </b-row>
          </b-card-text>

          <router-link
            :to="{ name: 'PerfilADP', params: { id: `${concurso}` } }"
          >
            <b-button variant="outline-primary">Ver más</b-button>
          </router-link>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Cards",
  computed: {
    ...mapState(["adps"]),
  },
};
</script>

<style scoped>
#firstColumn {
  height: 6rem;
}

img {
  width: 80%;
  height: 80%;
}

.row {
  margin: 0;
  padding: 0;
}

.sinPadding {
  padding: 0 !important;
}
</style>