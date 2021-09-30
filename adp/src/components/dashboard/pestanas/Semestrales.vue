<template>
  <div class="px-4">
    <!-- <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Inicio</th>
          <th scope="col">Autoevaluación</th>
          <th scope="col">Retroalimentación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ adp.eval_semestral_inicio | formatDate }}</td>
          <td>
            {{ adp.eval_semestral_auto | formatDate }}
          </td>
          <td>{{ adp.eval_semestral_retro | formatDate }}</td>
        </tr>
        <tr>
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
          <td>
            <span class="badge rounded-pill bg-warning text-dark"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span class="badge rounded-pill bg-primary text-white"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
          <td>
            <span class="badge rounded-pill bg-primary text-white"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
          <td>
            <span class="badge rounded-pill bg-primary text-white"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
export default {
  name: "Semestrales",
};
</script>

<style>
</style>