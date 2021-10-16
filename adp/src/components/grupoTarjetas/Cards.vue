<template>
  <main>
    <b-row
      id="filtros"
      cols="1"
      cols-sm="1"
      cols-md="4"
      cols-lg="4"
      class="mb-4 pb-4 pt-3 px-3 bg-dark shadow"
      rounded="bottom"
    >
      <b-col>
        <b-form-group>
          <b-form-input
            placeholder="Número de concurso"
            v-model="concurso"
          ></b-form-input> </b-form-group
      ></b-col>
      <b-col>
        <b-form-group>
          <b-form-select
            :options="servicios"
            v-model="servicio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-select
            :options="estadosConvenios"
            v-model="estadoConvenio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-input
            placeholder="Nombre ADP"
            v-model="nombreADP"
          ></b-form-input> </b-form-group
      ></b-col>
    </b-row>

    <b-container class="d-none d-lg-block">
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
              estado_adp,
            },
            i
          ) in filtrarADPs"
          :key="i"
          no-gutters
          class="mb-2"
        >
          <b-card tag="article" class="mb-2 shadow">
            <b-row>
              <b-col id="firstColumn" md="3" class="sinPadding text-center">
                <b-img :src="img" class="mt-1 rounded-circle"></b-img>
              </b-col>
              <b-col md="9" class="my-auto sinPadding">
                <h5 class="fs-6">
                  {{ nombre_corregido.split(" ")[0] }}
                  {{ apellido_corregido }}
                </h5>
                <h5 class="text-muted fs-6">{{ cargo }}</h5>
              </b-col>
            </b-row>

            <b-card-text>
              <b-row class="text-center">
                <b-col md="3"
                  ><p class="text-muted">Concurso</p>
                  <p>{{ concurso }}</p></b-col
                >
                <b-col md="6" v-if="estado_cd == 'Suscrito'"
                  ><p class="text-muted">Convenio</p>
                  <p>
                    {{ estado_cd }}
                  </p></b-col
                >
                <b-col md="6" v-else
                  ><p class="text-muted">Convenio</p>
                  <p>
                    {{ estado_cd }}
                  </p></b-col
                >
                <b-col md="3" v-if="estado_adp == 'Nombrado (primer periodo)'"
                  ><p class="text-muted">Periodo</p>
                  <p>Primero</p>
                </b-col>
                <b-col
                  md="3"
                  v-else-if="estado_adp == 'Renovado (segundo periodo)'"
                  ><p class="text-muted">Periodo</p>
                  <p>Segundo</p>
                </b-col>
                <b-col md="3" v-else
                  ><p class="text-muted">Periodo</p>
                  <p>Tercero</p>
                </b-col>
              </b-row>
            </b-card-text>

            <div class="text-center">
              <router-link
                :to="{ name: 'PerfilADP', params: { id: `${concurso}` } }"
              >
                <b-button variant="primary" class="mt-4" size="sm"
                  >Ver detalles</b-button
                >
              </router-link>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Cards",
  data() {
    return {
      servicio: "",
      estadoConvenio: "",
      concurso: "",
      nombreADP: "",
      id: "",
    };
  },
  methods: {
    // Inicio Filtros
    filtroPorNombreDeServicio(adps) {
      return adps.filter((adp) => !adp.servicio.indexOf(this.servicio));
    },
    filtroPorEstadoConvenio(adps) {
      return adps.filter((adp) => !adp.estado_cd.indexOf(this.estadoConvenio));
    },
    // filtroConveniosNoSuscritos(adps) {
    //   return adps.filter((adp) => adp.estado_cd !== "Suscrito");
    // },
    filtroPorConcurso(adps) {
      return adps.filter(
        (adp) => !adp.concurso.toString().indexOf(this.concurso)
      );
    },
    filtroPorNombreADP(adps) {
      return adps.filter(
        (adp) =>
          !adp.nombre_corregido
            .toLowerCase()
            .indexOf(this.nombreADP.toLowerCase())
      );
    },
  },
  computed: {
    ...mapState(["adps", "servicios", "estadosConvenios"]),
    filtrarADPs() {
      return this.filtroPorConcurso(
        this.filtroPorNombreDeServicio(
          // this.filtroConveniosNoSuscritos(
            this.filtroPorNombreADP(this.filtroPorEstadoConvenio(this.adps))
          // )
        )
      );
    },
    // filtroTodosMenosCDSuscritos() {
    //   const conveniosNoSuscritos = this.adps.filter(
    //     (adp) => adp.estado_cd !== "Suscrito"
    //   );
    //   return conveniosNoSuscritos;
    // },
  },
};
</script>

<style scoped>
#firstColumn {
  height: 6rem;
}

img {
  width: 70%;
  height: 70%;
}

.row {
  margin: 0;
  padding: 0;
}

.sinPadding {
  padding: 0 !important;
}

p {
  margin: 0;
  font-size: 0.9rem;
}
</style>