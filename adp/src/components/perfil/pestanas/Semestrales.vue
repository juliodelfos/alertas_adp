<template>
  <div class="px-4">
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th scope="col">Inicio</th>
          <th scope="col">Autoevaluación</th>
          <th scope="col">Retroalimentación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ eval_semestral_inicio | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-secondary text-dark"
                @click="$emit('inicioEvalSemestral')"
                ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
              >
            </div>
          </td>
          <td>
            {{ eval_semestral_auto | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-warning text-dark cursor"
                @click="$emit('autoEvalSemestral')"
                ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
              >
            </div>
          </td>
          <td>
            {{ eval_semestral_retro | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-secondary text-dark"
                @click="$emit('retroEvalSemestral')"
                ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Semestrales",
  props: {
    eval_semestral_inicio: { type: String, required: true },
    eval_semestral_auto: { type: String, required: true },
    eval_semestral_retro: { type: String, required: true },
    mail: { type: String, required: true },
    nombre_corregido: { type: String, required: true },
    apellido_corregido: { type: String, required: true },
  },
};
</script>

<style>
</style>