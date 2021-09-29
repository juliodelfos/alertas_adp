<template>
  <div class="px-4">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Clave SICDE</th>
          <th scope="col">Clave APP</th>
          <th scope="col">Bienvenida</th>
          <th scope="col">Bienvenida Renovado</th>
          <th scope="col">Encuesta de cierre</th>
          <th scope="col">Encuesta percepción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ adp.eval_anual_inicio | formatDate }}
          </td>
          <td>
            {{ adp.eval_anual_auto | formatDate }}
          </td>
          <td>{{ adp.eval_anual_retro | formatDate }}</td>
          <td>{{ adp.eval_anual_rex | formatDate }}</td>
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
            <span
              class="badge rounded-pill bg-primary text-white cursor"
              @click="addToCalendar(adp.indice)"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
          <td>
            <span
              class="badge rounded-pill bg-primary text-white cursor"
              @click="addToCalendar(adp.indice)"
              ><b-icon icon="calendar"></b-icon> Añadir a calendario
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Otras",
};
</script>

<style>
</style>