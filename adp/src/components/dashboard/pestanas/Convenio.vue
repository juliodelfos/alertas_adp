<template>
  <div class="px-4">
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th scope="col">Propuesta</th>
          <th scope="col">Suscripción</th>
          <th scope="col">Comunicación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <!-- {{ adp.fecha_propuesta | formatDate }} -->
            <span class="badge rounded-pill bg-primary text-white"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
          <td>
            <!-- {{ adp.fecha_suscripcion | formatDate }} -->
            <span class="badge rounded-pill bg-primary text-white"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
          <td>
            <!-- {{ adp.fecha_comunicacion | formatDate }} -->
            <span
              class="badge rounded-pill bg-primary text-white cursor"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span class="badge rounded-pill bg-warning text-dark"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span class="badge rounded-pill bg-warning text-dark"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Convenio",
};
</script>

<style>
</style>