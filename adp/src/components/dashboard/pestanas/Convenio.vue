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
            {{ fecha_propuesta | formatDate }}
            <div>
              <span
                class="badge rounded-pill bg-primary text-white"
                @click="$emit('addToCalendar')"
                ><b-icon icon="calendar"></b-icon> Añadir a calendario
              </span>
            </div>
          </td>
          <td>
            {{ fecha_suscripcion | formatDate }}
            <div>
              <span class="badge rounded-pill bg-primary text-white"
                ><b-icon icon="calendar"></b-icon> Añadir a calendario
              </span>
            </div>
          </td>
          <td>
            {{ fecha_comunicacion | formatDate }}
            <div>
              <span class="badge rounded-pill bg-primary text-white cursor"
                ><b-icon icon="calendar"></b-icon> Añadir a calendario
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark"
              @click="$emit('alertaCero')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark"
              @click="$emit('alertaSesenta')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning text-dark"
              @click="$emit('alertaNoventa')"
              ><b-icon icon="envelope-fill"></b-icon> Enviar alerta</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import emailjs from "emailjs-com";
export default {
  name: "Convenio",
  props: {
    fecha_propuesta: { type: String, required: true },
    fecha_suscripcion: { type: String, required: true },
    fecha_comunicacion: { type: String, required: true },
  },
  // data() {
  //   return {
  //     nombreADP: "Yerson",
  //     apellidoADP: "Olivares",
  //     email: "yersonob@gmail.com",
  //     cargoADP: "El Mejor, básiscamente",
  //     nombramientoADP: "Fecha1",
  //     suscripciónADP: "Fecha2",
  //     comunicacionADP: "Fecha3",
  //   };
  // },
  methods: {
    // alertaCero() {
    //   try {
    //     emailjs.sendForm(
    //       "gmail",
    //       "alerta0_nombrado",
    //       e.target,
    //       "user_j03eIIBx2tfg0roipyWbX",
    //       {
    //         nombreADP: this.nombreADP,
    //         apellidoADP: this.apellidoADP,
    //         email: this.email,
    //         cargoADP: this.cargoADP,
    //         nombramientoADP: this.nombramientoADP,
    //         suscripciónADP: this.suscripciónADP,
    //         comunicacionADP: this.comunicacionADP,
    //       }
    //     );
    //   } catch (error) {
    //     console.log({ error });
    //   }
    // },
  },
};
</script>

<style>
</style>