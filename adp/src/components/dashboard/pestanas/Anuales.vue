<template>
  <div class="px-4">
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th scope="col">Inicio</th>
          <th scope="col">Autoevaluación</th>
          <th scope="col">Retroalimentación</th>
          <th scope="col">Resolución</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ eval_anual_inicio | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-primary text-white cursor"
                @click="$emit('calendarInicioEvalAnual')"
                ><b-icon icon="calendar"></b-icon> Añadir a calendario
              </span>
            </div>
          </td>
          <td>
            {{ eval_anual_auto | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-primary text-white cursor"
                @click="$emit('calendarAutoEvalAnual')"
                ><b-icon icon="calendar"></b-icon> Añadir a calendario
              </span>
            </div>
          </td>
          <td>
            {{ eval_anual_retro | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-primary text-white cursor"
                @click="$emit('calendarRetroEvalAnual')"
                ><b-icon icon="calendar"></b-icon> Añadir a calendario
              </span>
            </div>
          </td>
          <td>
            {{ eval_anual_rex | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-primary text-white cursor"
                @click="$emit('calendarRetroEvalAnualREX')"
                ><b-icon icon="calendar"></b-icon> Añadir a calendario
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark cursor"
              @click="$emit('inicioEvalAnual')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark cursor"
              @click="$emit('autoEvalAnual')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark cursor"
              @click="$emit('retroEvalAnual')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark cursor"
              @click="$emit('rexEvalAnual')"
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
  name: "Anuales",
  props: {
    eval_anual_inicio: { type: String, required: true },
    eval_anual_auto: { type: String, required: true },
    eval_anual_retro: { type: String, required: true },
    eval_anual_rex: { type: String, required: true },
    mail: { type: String, required: true },
    nombre_corregido: { type: String, required: true },
    apellido_corregido: { type: String, required: true },
  },
};
</script>

<style>
</style>