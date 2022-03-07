<template>
  <div class="px-4">
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th scope="col">Alerta 0</th>
          <th scope="col">Alerta 60</th>
          <th scope="col">Alerta 90</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ fecha_propuesta | formatDate }}
            <div>
              <span
                v-if="estado_adp == 'Nombrado (primer periodo)'"
                class="badge rounded-pill bg-warning text-dark cursor"
                @click="$emit('alertaCero')"
                ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
              >
              <span
                v-else
                class="badge rounded-pill bg-warning text-dark cursor"
                @click="$emit('alertaCeroRenovado')"
                ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
              >
            </div>
          </td>
          <td>
            {{ fecha_suscripcion | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-warning text-dark cursor"
                @click="$emit('alertaSesenta')"
                ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
              >
            </div>
          </td>
          <td>
            {{ fecha_comunicacion | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-warning text-dark cursor"
                @click="$emit('alertaNoventa')"
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
  name: "Convenio",
  props: {
    fecha_propuesta: { type: String, required: true },
    fecha_suscripcion: { type: String, required: true },
    fecha_comunicacion: { type: String, required: true },
    estado_adp: { type: String, required: true },
  },
};
</script>