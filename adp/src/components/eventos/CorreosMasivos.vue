<template>
  <b-container class="py-3">
    <h1 class="fs-4 mb-3">Envío de correos masivos</h1>
    <p>
      Se puede copiar uno o varios concursos, directamente desde un Excel. En
      caso de añadir más de un concurso "a mano", separar cada uno de ellos por
      un espacio.
    </p>
    <p>
      Cada correo enviado sale con una diferencia de 1 segundo entre ellos, por
      lo que 60 correos tomaría 1 minuto.
      <b
        >No cerrar la ventana hasta recibir confirmación de envío de todos los
        correos.</b
      >
    </p>
    <b-input-group prepend="Concursos" class="mt-3 mb-4">
      <b-form-input v-model="concurso"></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" @click="anadeADPcomoDestinatario(concurso)"
          >Añadir</b-button
        >
      </b-input-group-append>
    </b-input-group>

    <h1 class="fs-4 text-center mb-3" v-show="destinatarios.length > 0">
      Destinatarios
    </h1>
    <div>
      <b-table striped hover :items="destinatarios"></b-table>
      <div class="text-center" v-show="destinatarios.length > 0">
        <b-button variant="danger" class="mx-1" @click="recorreArregloEnviaMail"
          >Enviar</b-button
        >
        <b-button variant="info" class="mx-1" @click="limpiarTabla"
          >Limpiar tabla</b-button
        >
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import emailjs from "emailjs-com";
import Vue from "vue";
import axios from "axios";
export default {
  name: "CorreosMasivos",
  data() {
    return {
      concurso: "",
      destinatarios: [],
    };
  },
  methods: {
    limpiarTabla() {
      this.destinatarios = [];
    },
    anadeADPcomoDestinatario(concurso) {
      // Creo arreglo a partir de los concursos añadidos
      const arregloApartirDeVariosConcursos = concurso.split(" ");
      // Recorro arreglo y compruebo que existan en mi base
      arregloApartirDeVariosConcursos.forEach((adp) => {
        const datosCompletos = this.adps.find((c) => c.concurso == adp);
        let {
          indice,
          concurso,
          nombre_corregido,
          apellido_corregido,
          cargo,
          servicio,
          encargado_mail,
        } = datosCompletos;
        if (datosCompletos) {
          this.destinatarios.push({
            indice,
            concurso,
            nombre_corregido,
            apellido_corregido,
            cargo,
            servicio,
            encargado_mail,
          });
        } else {
          console.log("no");
        }
      });
      this.concurso = "";
    },
    solicitaMes() {
      return prompt(`¿Qué mes corresponde la alerta?`, `Ej. diciembre`);
    },
    recorreArregloEnviaMail() {
      let mes = this.solicitaMes();
      this.destinatarios.forEach(({ indice }, i) => {
        setTimeout(() => {
          this.enviaCorreoPorEmailJS(mes, indice);
        }, i * 1000);
      });
      Vue.$toast.success("Correo enviado y registrado en planilla", {
        queue: true,
      });
    },
    enviaCorreoPorEmailJS(mes, indice) {
      const formateaFecha = (fecha) =>
        fecha.split("T00:00:00.000Z")[0].split("-");
      const fechaInicio = () =>
        formateaFecha(this.adps[indice].eval_anual_inicio);
      const fechaEval = () => formateaFecha(this.adps[indice].eval_anual_auto);
      const fechaRetro = () =>
        formateaFecha(this.adps[indice].eval_anual_retro);
      const fechaRex = () => formateaFecha(this.adps[indice].eval_anual_rex);
      let parametros = {
        nombre_ADP: this.adps[indice].nombre_corregido,
        apellido_ADP: this.adps[indice].apellido_corregido,
        mes: mes,
        cargo: this.adps[indice].cargo,
        encargado: this.adps[indice].encargado,
        inicio: `${fechaInicio(this.adps[indice])[2]}/${
          fechaInicio(this.adps[indice])[1]
        }/${fechaInicio(this.adps[indice])[0]}`,
        autoeval: `${fechaEval(this.adps[indice])[2]}/${
          fechaEval(this.adps[indice])[1]
        }/${fechaEval(this.adps[indice])[0]}`,
        retro: `${fechaRetro(this.adps[indice])[2]}/${
          fechaRetro(this.adps[indice])[1]
        }/${fechaRetro(this.adps[indice])[0]}`,
        rex: `${fechaRex(this.adps[indice])[2]}/${
          fechaRex(this.adps[indice])[1]
        }/${fechaRex(this.adps[indice])[0]}`,
        mail: this.adps[indice].mail_contraparte_cd,
        mail_encargado: this.adps[indice].encargado_mail,
        // Sólo para pruebas //
        // mail: "yersonob@gmail.com",
        // mail_encargado: "yersonob@gmail.com",
      };
      emailjs
        .send(
          "desarrolloadp",
          "evaluacion_mensual",
          parametros,
          "user_j03eIIBx2tfg0roipyWbX"
        )
        .then(
          ({ text }) => console.log(text),
          ({ text }) => console.log(text)
        );
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/google_sheets/esiAfklspbNVHooZ?tabId=Mails",
        data: [
          [
            `Alerta evaluación mensual ${mes}`,
            this.adps[indice].concurso,
            new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString(),
            this.adps[indice].mail_contraparte_cd,
            // "yersonob@gmail.com",
          ],
        ],
      })
        .then(({ data }) => console.log(data))
        .catch((error) => console.log(error));
    },
  },
  computed: {
    ...mapState(["adps"]),
  },
};
</script>