<template>
  <main>
    <b-card tag="article" class="mb-2 shadow">
      <b-row>
        <b-col id="firstColumn" md="3" class="sinPadding text-center">
          <!-- <b-img :src="img" class="mt-1 rounded-circle"></b-img> -->
          <div class="contenedor">
            <span id="profilePic">
              {{ nombre_corregido.charAt(0) }}{{ apellido_corregido.charAt(0) }}
            </span>
          </div>
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
          <b-col md="3" v-else-if="estado_adp == 'Renovado (segundo periodo)'"
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
        <router-link :to="{ name: 'Perfil', params: { id: `${concurso}` } }">
          <b-button variant="primary" class="mt-4" size="sm"
            >Ver detalles</b-button
          >
        </router-link>
      </div>
    </b-card>
  </main>
</template>

<script>
export default {
  name: "Card",
  props: {
    nombre_corregido: { type: String, required: true },
    apellido_corregido: { type: String, required: true },
    cargo: { type: String, required: true },
    concurso: { type: String, required: true },
    estado_cd: { type: String, required: true },
    estado_adp: { type: String, required: true },
  },
};
</script>

<style scoped>
#firstColumn {
  height: 6rem;
}

/* img {
  width: 70%;
  height: 70%;
} */

.row {
  margin: 0;
  padding: 0;
}

.sinPadding {
  padding: 0 !important;
}

.sinPaddingHorizontal {
  padding: 1rem 0 !important;
}

p {
  margin: 0;
  font-size: 0.9rem;
}

.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 70%;
  height: 70%;
  background-color: #b7acf3;
  color: white;
  font-size: 1.4rem;
}

#profilePic {
  flex: 0 0 120px;
}
</style>