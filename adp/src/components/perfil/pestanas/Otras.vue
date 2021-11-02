<template>
  <div class="px-4">
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th scope="col">Clave SICDE</th>
          <th scope="col">Clave APP</th>
          <th scope="col">Bienvenida</th>
          <th scope="col">Encuesta de cierre</th>
          <th scope="col">Encuesta percepción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark cursor"
              @click="$emit('claveSICDE')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar clave</span
            >
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark cursor"
              @click="$emit('claveAPP')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar clave</span
            >
          </td>
          <td>
            <span
              class="badge rounded-pill bg-secondary text-dark" 
              @click="$emit('bienvenida')"
              v-if="estado_adp == 'Nombrado (primer periodo)'"
              ><b-icon icon="envelope-fill"></b-icon> Enviar correo</span
            >
            <span class="badge rounded-pill bg-secondary text-dark" v-else @click="$emit('bienvenidaRenovado')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar correo</span
            >
          </td>

          <td>
            <span class="badge rounded-pill bg-warning text-dark cursor" @click="$emit('encuestaCierre')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar correo</span
            >
          </td>
          <td>
            <span class="badge rounded-pill bg-warning text-dark cursor"  @click="$emit('encuestaPercepcion')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar correo</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Otras",
  props: {
    estado_adp: { type: String, required: true },
  },
};
</script>

<style>
</style>