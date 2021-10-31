<template>
  <main>
    <b-row
      id="filtros"
      cols="1"
      cols-sm="1"
      cols-md="5"
      cols-lg="5"
      class="mb-4 pb-4 pt-3 px-3 bg-primary shadow"
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
            :options="ministerios"
            v-model="ministerio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
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
              estado_adp,
              indice
            },
            i
          ) in filtrarADPs"
          :key="i"
          no-gutters
          class="mb-2"
        >
          <Card
            :nombre_corregido="nombre_corregido"
            :apellido_corregido="apellido_corregido"
            :cargo="cargo"
            :concurso="concurso"
            :estado_cd="estado_cd"
            :estado_adp="estado_adp"
            :indice="indice"
          />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/tarjetas/Card.vue";
export default {
  name: "Cards",
  components: { Card },
  data() {
    return {
      servicio: "",
      ministerio: "",
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
    filtroPorNombreDeMinisterio(adps) {
      return adps.filter((adp) => !adp.ministerio.indexOf(this.ministerio));
    },
    filtroPorEstadoConvenio(adps) {
      return adps.filter((adp) => !adp.estado_cd.indexOf(this.estadoConvenio));
    },
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
    ...mapState(["adps", "servicios", "ministerios", "estadosConvenios"]),
    filtrarADPs() {
      return this.filtroPorConcurso(
        this.filtroPorNombreDeMinisterio(
          this.filtroPorNombreDeServicio(
            this.filtroPorNombreADP(this.filtroPorEstadoConvenio(this.adps))
          )
        )
      );
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0;
  padding: 0;
}
</style>