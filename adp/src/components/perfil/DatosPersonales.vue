<template>
  <div>
    <b-row no-gutters>
      <div class="bg-primary text-center pt-3 pb-2 text-white shadow">
        <h1 class="fs-4">
          <b-icon icon="person-circle"></b-icon>
          {{ adps[this.indice].nombre_corregido.split(" ")[0] }}
          {{ adps[this.indice].apellido_corregido.split(" ")[0] }}
          ·
          {{ adps[this.indice].concurso }}
        </h1>
      </div>

      <!-- Gráfico y correos -->
      <b-row class="py-4 pe-5">
        <b-col md="6">
          <Grafico
            :porcentaje_dias_cargo="adps[this.indice].porcentaje_dias_cargo"
            :porcentaje_dias_anogestion="
              adps[this.indice].porcentaje_dias_anogestion
            "
          />
        </b-col>
        <b-col md="6">
          <UltimosCorreos :concurso="adps[this.indice].concurso" />
        </b-col>
      </b-row>

      <!-- Datos básicos -->
      <Identificacion
        class="pe-5"
        :cargo="adps[this.indice].cargo"
        :fecha_nombramiento_renovacion="
          adps[this.indice].fecha_nombramiento_renovacion
        "
        :estado_adp="adps[this.indice].estado_adp"
        :mail="adps[this.indice].mail"
        :mail_contraparte_cd="adps[this.indice].mail_contraparte_cd"
        :mail_contraparte_eval="adps[this.indice].mail_contraparte_eval"
        :estado_cd="adps[this.indice].estado_cd"
        :servicio="adps[this.indice].servicio"
        :nombre="adps[this.indice].nombre"
        :apellido="adps[this.indice].apellido"
      />

      <!-- Pestañas -->
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Convenio de desempeño" active>
          <div id="alertasConvenio">
            <Convenio
              v-if="adps[this.indice].estado_cd !== 'Suscrito'"
              :fecha_comunicacion="adps[this.indice].fecha_comunicacion"
              :fecha_propuesta="adps[this.indice].fecha_propuesta"
              :fecha_suscripcion="adps[this.indice].fecha_suscripcion"
              :estado_adp="adps[this.indice].estado_adp"
              @alertaCero="alertaCero(adps[indice].indice)"
              @alertaCeroRenovado="alertaCeroRenovado(adps[indice].indice)"
              @alertaSesenta="alertaSesenta(adps[indice].indice)"
              @alertaNoventa="alertaNoventa(adps[indice].indice)"
            />
            <div class="text-center pt-3 pb-4 fs-5 fw-bold" v-else>
              Convenio suscrito
              <b-icon icon="check-circle-fill" id="convenioSuscrito"></b-icon>
            </div>
          </div>
        </b-tab>
        <b-tab title="Evaluaciones semestrales">
          <div id="Evaluaciones semestrales">
            <Semestrales
              v-if="
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Barrancas' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Andalién Sur' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Atacama' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Chinchorro' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Colchagua' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Costa Araucanía' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Gabriela Mistral' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Huasco' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Llanquihue' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Puerto Cordillera' ||
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Valparaíso' ||
                adps[this.indice].nivel == 'II'
              "
              :eval_semestral_inicio="adps[this.indice].eval_semestral_inicio"
              :eval_semestral_auto="adps[this.indice].eval_semestral_auto"
              :eval_semestral_retro="adps[this.indice].eval_semestral_retro"
              :mail="adps[this.indice].mail"
              :nombre_corregido="adps[this.indice].nombre_corregido"
              :apellido_corregido="adps[this.indice].apellido_corregido"
              @autoEvalSemestral="autoEvalSemestral(adps[indice].indice)"
            />
            <div class="text-center pt-3 pb-4 fs-5 fw-bold" v-else>
              I niveles no sujetos a evaluación parcial
            </div>
          </div>
        </b-tab>
        <b-tab title="Evaluaciones anuales">
          <div
            class="text-center pt-3 pb-4 fs-5 fw-bold"
            v-if="
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Barrancas') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Andalién Sur') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Atacama') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Chinchorro') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Colchagua') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Costa Araucanía') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Gabriela Mistral') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Huasco') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Llanquihue') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Puerto Cordillera') ||
              (adps[this.indice].nivel == 'I' &&
                adps[this.indice].servicio ==
                  'Servicio Local de Educación Valparaíso')
            "
          >
            Fecha varía según año escolar
          </div>
          <Anuales
            v-else
            :eval_anual_inicio="adps[this.indice].eval_anual_inicio"
            :eval_anual_auto="adps[this.indice].eval_anual_auto"
            :eval_anual_retro="adps[this.indice].eval_anual_retro"
            :eval_anual_rex="adps[this.indice].eval_anual_rex"
            :mail="adps[this.indice].mail"
            :nombre_corregido="adps[this.indice].nombre_corregido"
            :apellido_corregido="adps[this.indice].apellido_corregido"
            @autoEvalAnual="autoEvalAnual(adps[indice].indice)"
            @rexEvalAnual="rexEvalAnual(adps[indice].indice)"
          />
        </b-tab>
        <b-tab title="Otras comunicaciones">
          <Otras
            :estado_adp="adps[this.indice].estado_adp"
            @claveSICDE="claveSICDE(adps[indice].indice)"
            @claveAPP="claveAPP(adps[indice].indice)"
            @bienvenida="bienvenida(adps[indice].indice)"
            @bienvenidaRenovado="bienvenidaRenovado(adps[indice].indice)"
            @encuestaCierre="encuestaCierre(adps[indice].indice)"
            @encuestaPercepcion="encuestaPercepcion(adps[indice].indice)"
          />
        </b-tab>
      </b-tabs>
    </b-row>
  </div>
  <!-- </div> -->
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Convenio from "@/components/perfil/pestanas/Convenio.vue";
import Semestrales from "@/components/perfil/pestanas/Semestrales.vue";
import Anuales from "@/components/perfil/pestanas/Anuales.vue";
import Otras from "@/components/perfil/pestanas/Otras.vue";
import Identificacion from "@/components/perfil/datos_personales/Identificacion.vue";
import Grafico from "@/components/perfil/datos_personales/Grafico.vue";
import UltimosCorreos from "@/components/perfil/datos_personales/UltimosCorreos.vue";
import { enviaAlertaCeroNombrado } from "@/metodosEnvioMails/alertaCeroNombrado.js";
import { enviaAlertaCeroRenovado } from "@/metodosEnvioMails/alertaCeroRenovado.js";
import { enviaAlertaSesenta } from "@/metodosEnvioMails/alertaSesenta.js";
import { enviaAlertaNoventa } from "@/metodosEnvioMails/alertaNoventa.js";
import { enviaClaveSICDE } from "@/metodosEnvioMails/claveSICDE.js";
import { enviaClaveAPP } from "@/metodosEnvioMails/claveAPP.js";
import { enviaBienvenidaNombrado } from "@/metodosEnvioMails/bienvenidaNombrado.js";
import { enviaBienvenidaRenovado } from "@/metodosEnvioMails/bienvenidaRenovado.js";
import { enviaEncuestaCierre } from "@/metodosEnvioMails/encuestaCierre.js";
import { enviaEncuestaPercepcion } from "@/metodosEnvioMails/encuestaPercepcion.js";
import { enviaAutoEvalParcialPendiente } from "@/metodosEnvioMails/autoEvalParcialPendiente.js";
import { enviaAutoEvalAnualPendiente } from "@/metodosEnvioMails/autoEvalAnualPendiente.js";
import { enviaRexEvalAnualPendiente } from "@/metodosEnvioMails/rexEvalAnualPendiente.js";
import { creaDocumentoEnDB } from "@/metodosFirebase/registraAlerta.js";
import { creaDocumentoEnDBCierre } from "@/metodosFirebase/registraAlertaCierre.js";

export default {
  name: "DatosPersonales",
  components: {
    Convenio,
    Semestrales,
    Anuales,
    Otras,
    Identificacion,
    Grafico,
    UltimosCorreos,
  },
  data() {
    return {
      concurso: "",
      id: "",
      servicio: "",
      estadoConvenio: "",
      nombreADP: "",
    };
  },
  props: ["indice"],
  methods: {
    //#region Métodos largos

    // Retorna una ventana de confirmación para el envío del mail
    cuadroDeConfirmacion(tipo) {
      return confirm(`¿Enviar ${tipo}?`);
    },
    // Retorna arreglo de fechas tipo ["01", "23", "2021"]
    formateaFecha(fecha) {
      return fecha.split("T00:00:00.000Z")[0].split("-");
    },
    // Retorna arreglo de fechas tipo "01/01/2021"
    formateaFechaCalendar(fecha) {
      return fecha.split("T00:00:00.000Z")[0];
    },
    // Retorna HTML con ruta que permite añadir evento a Calendarios desde link directo
    addFechaToCalendar(motivo, fecha, nombre, apellido) {
      return `<a href="https://calndr.link/d/event/?service=google&start=${fecha} 08:00&title=${motivo} ${nombre} ${apellido}&timezone=America/Santiago">Añadir al Calendario</a>`;
    },
    // Retorna fecha y hora actual
    fechaYHora() {
      return (
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      );
    },
    // Crea clave app
    creaClaveAPP(texto) {
      // Retira tildes
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    //#endregion

    //#region Base métodos Calendarios
    // Fechas que van en el texto del correo
    fechaNombramiento(i) {
      return this.formateaFecha(this.adps[i].fecha_nombramiento_renovacion);
    },
    fechaSuscripcion(i) {
      return this.formateaFecha(this.adps[i].fecha_suscripcion);
    },
    fechaComunicacion(i) {
      return this.formateaFecha(this.adps[i].fecha_comunicacion);
    },
    // Fechas que permiten añadir evento a Calendar
    fechaNombramientoToCalendar(i) {
      return this.formateaFechaCalendar(
        this.adps[i].fecha_nombramiento_renovacion
      );
    },
    fechaSuscripcionParaCalendar(i) {
      return this.formateaFechaCalendar(this.adps[i].fecha_suscripcion);
    },
    fechaComunicacionParaCalendar(i) {
      return this.formateaFechaCalendar(this.adps[i].fecha_comunicacion);
    },
    //#endregion

    //#region Alertas con Fidelizador
    // Convenios
    alertaCero(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(`Alerta 0`);

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se pasan parámetros, se envía mail y se almacena en variable
        const correo = enviaAlertaCeroNombrado(
          this.adps[i].nombre_corregido,
          this.adps[i].apellido_corregido,
          this.adps[i].cargo,
          `${this.fechaNombramiento(i)[2]}/${this.fechaNombramiento(i)[1]}/${
            this.fechaNombramiento(i)[0]
          }`,
          this.addFechaToCalendar(
            "Inicio elaboración convenio",
            this.fechaNombramientoToCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          `${this.fechaSuscripcion(i)[2]}/${this.fechaSuscripcion(i)[1]}/${
            this.fechaSuscripcion(i)[0]
          }`,
          this.addFechaToCalendar(
            "Suscripción convenio",
            this.fechaSuscripcionParaCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          `${this.fechaComunicacion(i)[2]}/${this.fechaComunicacion(i)[1]}/${
            this.fechaComunicacion(i)[0]
          }`,
          this.addFechaToCalendar(
            "Comunicación convenio",
            this.fechaComunicacionParaCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          this.adps[i].mail_contraparte_cd,
          "Servicio Civil - Inicio elaboración de convenio de desempeño"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Alerta Cero primer periodo`,
            this.adps[i].concurso,
            this.adps[i].mail_contraparte_cd
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    alertaCeroRenovado(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion =
        this.cuadroDeConfirmacion(`Alerta 0 Renovado`);

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se pasan parámetros, se envía mail y se almacena en variable
        const correo = enviaAlertaCeroRenovado(
          this.adps[i].nombre_corregido,
          this.adps[i].apellido_corregido,
          this.adps[i].cargo,
          `${this.fechaNombramiento(i)[2]}/${this.fechaNombramiento(i)[1]}/${
            this.fechaNombramiento(i)[0]
          }`,
          this.addFechaToCalendar(
            "Inicio elaboración convenio",
            this.fechaNombramientoToCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          `${this.fechaSuscripcion(i)[2]}/${this.fechaSuscripcion(i)[1]}/${
            this.fechaSuscripcion(i)[0]
          }`,
          this.addFechaToCalendar(
            "Suscripción convenio",
            this.fechaSuscripcionParaCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          `${this.fechaComunicacion(i)[2]}/${this.fechaComunicacion(i)[1]}/${
            this.fechaComunicacion(i)[0]
          }`,
          this.addFechaToCalendar(
            "Comunicación convenio",
            this.fechaComunicacionParaCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          this.adps[i].mail_contraparte_cd,
          "Servicio Civil - Inicio elaboración de convenio de desempeño"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Alerta Cero Renovado`,
            this.adps[i].concurso,
            this.adps[i].mail_contraparte_cd
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    alertaSesenta(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(`Alerta 60`);

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se pasan parámetros, se envía mail y se almacena en variable
        const correo = enviaAlertaSesenta(
          this.adps[i].nombre_corregido,
          this.adps[i].apellido_corregido,
          this.adps[i].estado_cd,
          `${this.fechaSuscripcion(i)[2]}/${this.fechaSuscripcion(i)[1]}/${
            this.fechaSuscripcion(i)[0]
          }`,
          this.addFechaToCalendar(
            "Suscripción convenio",
            this.fechaSuscripcionParaCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          this.adps[i].mail_contraparte_cd,
          "Servicio Civil - Convenio de Desempeño pendiente"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Alerta Sesenta`,
            this.adps[i].concurso,
            this.adps[i].mail_contraparte_cd
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    alertaNoventa(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(`Alerta 90`);

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se pasan parámetros, se envía mail y se almacena en variable
        const correo = enviaAlertaNoventa(
          this.adps[i].nombre_corregido,
          this.adps[i].apellido_corregido,
          this.adps[i].estado_cd,
          `${this.fechaSuscripcion(i)[2]}/${this.fechaSuscripcion(i)[1]}/${
            this.fechaSuscripcion(i)[0]
          }`,
          this.addFechaToCalendar(
            "Suscripción convenio",
            this.fechaSuscripcionParaCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          `${this.fechaComunicacion(i)[2]}/${this.fechaComunicacion(i)[1]}/${
            this.fechaComunicacion(i)[0]
          }`,
          this.addFechaToCalendar(
            "Comunicación convenio",
            this.fechaComunicacionParaCalendar(i),
            this.adps[i].nombre_corregido,
            this.adps[i].apellido_corregido
          ),
          this.adps[i].mail_contraparte_cd,
          `⚠️ [Urgente] Servicio Civil - Convenio de desempeño pendiente`
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Alerta Noventa`,
            this.adps[i].concurso,
            this.adps[i].mail_contraparte_cd
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    // Otras alertas
    claveSICDE(i) {
      // Cuadro de diálogo pregunta qué clave se enviará
      const claveNueva = prompt(`¿Qué clave le has asignado a este ADP?`);

      // Si usuario confirma envío de mail
      if (claveNueva) {
        // Se envía mail y se almacena en variable
        const correo = enviaClaveSICDE(
          this.adps[i].mail,
          claveNueva,
          this.adps[i].mail,
          "Servicio Civil - Credenciales acceso SICDE"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Clave SICDE`,
            this.adps[i].concurso,
            this.adps[i].mail
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    claveAPP(i) {
      // Crea clave en formato na1234
      const iniciales = this.creaClaveAPP(
        this.adps[i].nombre_corregido.charAt(0).toLowerCase() +
          this.adps[i].apellido_corregido.charAt(0).toLowerCase()
      );

      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(
        `clave ${iniciales}1234`,
        this.adps[i].mail
      );

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se envía mail y se almacena en variable
        const correo = enviaClaveAPP(
          this.adps[i].rut,
          this.creaClaveAPP(
            this.adps[i].nombre_corregido.charAt(0).toLowerCase() +
              this.adps[i].apellido_corregido.charAt(0).toLowerCase() +
              `1234`
          ),
          this.adps[i].mail,
          "Servicio Civil - Clave acceso app móvil"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Clave app`,
            this.adps[i].concurso,
            this.adps[i].mail
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    bienvenida(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(
        `Bienvenida nombrado primer periodo`
      );

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se pasan parámetros, se envía mail y se almacena en variable
        const correo = enviaBienvenidaNombrado(
          this.adps[i].nombre_corregido.split(" ")[0],
          this.adps[i].encargado,
          this.adps[i].encargado_mail,
          this.adps[i].rut,
          this.creaClaveAPP(
            this.adps[i].nombre_corregido.charAt(0).toLowerCase() +
              this.adps[i].apellido_corregido.charAt(0).toLowerCase() +
              `1234`
          ),
          this.adps[i].mail,
          `Servicio Civil - 👋 Hola ${
            this.adps[i].nombre_corregido.split(" ")[0]
          }`
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Bienvenida primer periodo`,
            this.adps[i].concurso,
            this.adps[i].mail
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    bienvenidaRenovado(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(
        `Bienvenida renovado (segundo o tercer periodo)`
      );

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se pasan parámetros, se envía mail y se almacena en variable
        const correo = enviaBienvenidaRenovado(
          this.adps[i].nombre_corregido.split(" ")[0],
          this.adps[i].cargo,
          this.adps[i].encargado,
          this.adps[i].encargado_mail,
          this.adps[i].rut,
          this.creaClaveAPP(
            this.adps[i].nombre_corregido.charAt(0).toLowerCase() +
              this.adps[i].apellido_corregido.charAt(0).toLowerCase() +
              `1234`
          ),
          this.adps[i].mail,
          `Servicio Civil - 👋 Hola ${
            this.adps[i].nombre_corregido.split(" ")[0]
          } (de nuevo)`
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Bienvenida ADP renovado`,
            this.adps[i].concurso,
            this.adps[i].mail
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    encuestaCierre(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaMailPersonal = prompt(
        `¿A qué dirección de correo enviarás el cuestionario?`,
        `Recuerda que debe ser un correo personal`
      );

      // Si usuario confirma envío de mail
      if (solicitaMailPersonal) {
        // Se envía mail y se almacena en variable
        const correo = enviaEncuestaCierre(
          this.adps[i].nombre_corregido.split(" ")[0],
          solicitaMailPersonal,
          "Servicio Civil - Cuestionario de cierre"
        );

        //Se registra correo en Firestore sólo si correo sale
        if (correo) {
          creaDocumentoEnDBCierre(
            `Cuestionario de cierre`,
            this.adps[i].concurso,
            solicitaMailPersonal
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    encuestaPercepcion(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(
        `Encuesta de percepción`
      );

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se pasan parámetros, se envía mail y se almacena en variable
        const correo = enviaEncuestaPercepcion(
          this.adps[i].nombre_corregido,
          this.adps[i].apellido_corregido,
          this.adps[i].cargo,
          this.adps[i].mail_contraparte_cd,
          "Servicio Civil - Encuesta percepcion suscripción convenio ADP"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Encuesta de percepción`,
            this.adps[i].concurso,
            this.adps[i].mail_contraparte_cd
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    autoEvalSemestral(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(
        `Alerta Evaluación Semestral pendiente`
      );

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se envía mail y se almacena en variable
        const correo = enviaAutoEvalParcialPendiente(
          this.adps[i].nombre_corregido.split(" ")[0],
          this.adps[i].mail,
          "Servicio Civil - Evaluación parcial pendiente"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Eval parcial pendiente`,
            this.adps[i].concurso,
            this.adps[i].mail
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    autoEvalAnual(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(
        `Alerta Evaluación Anual pendiente`
      );

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se envía mail y se almacena en variable
        const correo = enviaAutoEvalAnualPendiente(
          this.adps[i].nombre_corregido.split(" ")[0],
          this.adps[i].mail,
          "Servicio Civil - Evaluación anual pendiente"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `Eval anual pendiente`,
            this.adps[i].concurso,
            this.adps[i].mail
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    rexEvalAnual(i) {
      // Cuadro de diálogo para confirmar envío de correo
      const solicitaConfirmacion = this.cuadroDeConfirmacion(
        `Alerta REX Evaluación Anual pendiente`
      );

      // Si usuario confirma envío de mail
      if (solicitaConfirmacion) {
        // Se envía mail y se almacena en variable
        const correo = enviaRexEvalAnualPendiente(
          this.adps[i].nombre_corregido.split(" ")[0],
          this.adps[i].apellido_corregido.split(" ")[0],
          this.adps[i].mail_contraparte_eval,
          "Servicio Civil - Carga de resolución de evaluación anual pendiente"
        );

        // Se registra Firebase sólo si correo sale
        if (correo) {
          creaDocumentoEnDB(
            `REX Eval anual pendiente`,
            this.adps[i].concurso,
            this.adps[i].mail
          );
        } else {
          Vue.$toast.warning("No se registró correo en planilla");
        }
      } else {
        Vue.$toast.warning("Correo no enviado");
      }
    },

    //#endregion
  },

  computed: {
    ...mapState(["adps"]),
  },
  created() {
    this.concurso = this.$attrs.id;
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
}

.row {
  padding: 0;
  margin: 0;
}
</style>
