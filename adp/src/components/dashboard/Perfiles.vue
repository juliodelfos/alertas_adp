<template>
  <div>
    <b-row
      cols="1"
      cols-sm="1"
      cols-md="4"
      cols-lg="4"
      class="mb-4 pb-4 pt-3 px-3 bg-primary text-white shadow rounded"
    >
      <b-col>
        <b-form-group>
          <b-form-input
            placeholder="Número de concurso"
            v-model="concurso"
          ></b-form-input> </b-form-group
      ></b-col>
      <b-col>
        <b-form-group>
          <b-form-select
            :options="servicios"
            v-model="servicio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-select
            :options="estadosConvenios"
            v-model="estadoConvenio"
            class="form-select"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-input
            placeholder="Nombre ADP"
            v-model="nombreADP"
          ></b-form-input> </b-form-group
      ></b-col>
    </b-row>
    <b-container>
      <!-- Buscador -->

      <!-- Cards -->
      <b-card
        no-body
        class="overflow-hidden shadow mb-4"
        v-for="(adp, i) in filtrarADPs"
        :key="i"
      >
        <b-row no-gutters>
          <div class="bg-primary text-white pt-3 pb-2">
            <h1 class="fs-4">
              <b-icon icon="person-circle"></b-icon>
              {{ adp.nombre_corregido.split(" ")[0] }}
              {{ adp.apellido_corregido.split(" ")[0] }}
              ·
              {{ adp.concurso }}
            </h1>
          </div>
          <b-col md="12" class="py-3">
            <b-card-body>
              <img
                :src="adp.img"
                alt="Foto de perfil"
                class="fotoPerfil rounded-circle"
              />
            </b-card-body>

            <table class="table table-borderless mb-4">
              <tbody>
                <tr>
                  <td>
                    <b-icon icon="bag-fill"></b-icon><b> Cargo:</b>
                    {{ adp.cargo }} ({{ adp.nivel }} nivel)
                  </td>
                  <td>
                    <b-icon icon="door-closed-fill"></b-icon><b> Servicio:</b>
                    {{ adp.servicio }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b-icon icon="calendar2-event-fill"></b-icon
                    ><b> Fecha nombramiento o renovación:</b>
                    {{ adp.fecha_nombramiento_renovacion | formatDate }}
                  </td>
                  <td>
                    <b-icon icon="envelope-fill"></b-icon>
                    <b> Correo:</b>
                    <a
                      :href="
                        enviarMailAADP +
                        adp.mail +
                        cuerpoMail +
                        `Estimada/o ` +
                        adp.nombre_corregido
                      "
                      target="_blank"
                    >
                      {{ adp.mail }}</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    <b-icon icon="info-square-fill"></b-icon
                    ><b> Estado en el sistema:</b> {{ adp.estado_adp }}
                  </td>
                  <td v-if="adp.estado_cd == 'Suscrito'">
                    <b-icon icon="question-octagon-fill"></b-icon
                    ><b> Estado de convenio:</b> {{ adp.estado_cd }}
                    <b-icon
                      icon="check-circle-fill"
                      id="convenioSuscrito"
                    ></b-icon>
                  </td>
                  <td v-else>
                    <b-icon icon="question-octagon-fill"></b-icon
                    ><b> Estado de convenio:</b> {{ adp.estado_cd }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b-icon icon="person-badge-fill"></b-icon>
                    <b> Contraparte convenio:</b>
                    <a
                      :href="enviarMailAADP + adp.mail_contraparte_cd"
                      target="_blank"
                    >
                      {{ adp.mail_contraparte_cd }}</a
                    >
                  </td>
                  <td>
                    <b-icon icon="person-lines-fill"></b-icon>
                    <b> Contraparte evaluación:</b
                    ><a
                      :href="enviarMailAADP + adp.mail_contraparte_eval"
                      target="_blank"
                    >
                      {{ adp.mail_contraparte_eval }}</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>

          <div>
            <b-tabs content-class="mt-3" align="center">
              <b-tab title="Convenio de desempeño" active>
                <div class="px-4">
                  <table class="table table-bordered">
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
                          {{ adp.fecha_propuesta | formatDate }}
                        </td>
                        <td>
                          {{ adp.fecha_suscripcion | formatDate }}
                        </td>
                        <td>{{ adp.fecha_comunicacion | formatDate }}</td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            class="badge rounded-pill bg-warning text-dark"
                            @click="sendEmail(adp.indice)"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-warning text-dark"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-warning text-dark"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="badge rounded-pill bg-primary text-white"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-primary text-white"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                        <td>
                          <span
                            class="
                              badge
                              rounded-pill
                              bg-primary
                              text-white
                              cursor
                            "
                            @click="addToCalendar(adp.indice)"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <b-tab title="Evaluaciones semestrales">
                <div class="px-4">
                  <table class="table table-bordered">
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
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-warning text-dark"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-warning text-dark"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="badge rounded-pill bg-primary text-white"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-primary text-white"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-primary text-white"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <b-tab title="Evaluaciones anuales">
                <div class="px-4">
                  <table class="table table-bordered">
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
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-warning text-dark"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-warning text-dark"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-warning text-dark"
                            ><b-icon icon="envelope-fill"></b-icon> Enviar
                            alerta</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="badge rounded-pill bg-primary text-white"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                        <td>
                          <span class="badge rounded-pill bg-primary text-white"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                        <td>
                          <span
                            class="
                              badge
                              rounded-pill
                              bg-primary
                              text-white
                              cursor
                            "
                            @click="addToCalendar(adp.indice)"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                        <td>
                          <span
                            class="
                              badge
                              rounded-pill
                              bg-primary
                              text-white
                              cursor
                            "
                            @click="addToCalendar(adp.indice)"
                            ><b-icon icon="calendar"></b-icon> Añadir a
                            calendario
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Perfiles",
  data() {
    return {
      servicio: "",
      estadoConvenio: "",
      concurso: "",
      nombreADP: "",
      enviarMailAADP: "https://mail.google.com/mail/?view=cm&source=mailto&to=",
      cuerpoMail: "&body=",
      mail: {
        senderName: "",
        senderEmail: "",
        to: "",
        subject: "",
        template: "",
        deliveryTime: "",
        name: "",
      },
      estadosConvenios: [
        { value: "", text: "Selecciona un estado" },
        { value: "Suscrito", text: "Suscrito" },
        { value: "Elaboración Servicio", text: "Elaboración Servicio" },
        { value: "Servicio Firma", text: "Servicio Firma" },
        { value: "Esperando Firma", text: "Esperando Firma" },
        { value: "DNSC Revisión", text: "DNSC Revisión" },
        { value: "Elaboración Ministerio", text: "Elaboración Ministerio" },
        {
          value: "Servicio Revisión de Observaciones",
          text: "Servicio Revisión de Observaciones",
        },
        {
          value: "Ministerio Revisión de Observaciones",
          text: "Ministerio Revisión de Observaciones",
        },
        {
          value: "Ministerio Resolución",
          text: "Ministerio Revisión de Observaciones",
        },
      ],
      servicios: [
        { value: "", text: "Selecciona un servicio" },
        {
          value: "Agencia de Calidad de la Educación",
          text: "Agencia de Calidad de la Educación",
        },
        {
          value: "Consejo de Rectores",
          text: "Consejo de Rectores",
        },
        {
          value: "Junta Nacional de Auxilio Escolar y Becas",
          text: "Junta Nacional de Auxilio Escolar y Becas",
        },
        {
          value: "Junta Nacional de Jardines Infantiles",
          text: "Junta Nacional de Jardines Infantiles",
        },
        {
          value: "Servicio Local de Educación Andalién Sur",
          text: "Servicio Local de Educación Andalién Sur",
        },
        {
          value: "Servicio Local de Educación Atacama",
          text: "Servicio Local de Educación Atacama",
        },
        {
          value: "Servicio Local de Educación Barrancas",
          text: "Servicio Local de Educación Barrancas",
        },
        {
          value: "Servicio Local de Educación Chinchorro",
          text: "Servicio Local de Educación Chinchorro",
        },
        {
          value: "Servicio Local de Educación Colchagua",
          text: "Servicio Local de Educación Colchagua",
        },
        {
          value: "Servicio Local de Educación Costa Araucanía",
          text: "Servicio Local de Educación Costa Araucanía",
        },
        {
          value: "Servicio Local de Educación Gabriela Mistral",
          text: "Servicio Local de Educación Gabriela Mistral",
        },
        {
          value: "Servicio Local de Educación Huasco",
          text: "Servicio Local de Educación Huasco",
        },
        {
          value: "Servicio Local de Educación Llanquihue",
          text: "Servicio Local de Educación Llanquihue",
        },
        {
          value: "Servicio Local de Educación Puerto Cordillera",
          text: "Servicio Local de Educación Puerto Cordillera",
        },
        {
          value: "Servicio Local de Educación Valparaíso",
          text: "Servicio Local de Educación Valparaíso",
        },
        {
          value: "Servicio Nacional de Educación Pública",
          text: "Dirección de Educación Pública",
        },
        {
          value: "Superintendencia de Educación",
          text: "Superintendencia de Educación",
        },
        {
          value: "Superintendencia de Educación Superior",
          text: "Superintendencia de Educación Superior",
        },
      ],
      // Provisorio
      adps: [
        {
          concurso: "4299",
          ministerio: "Ministerio de Educación",
          servicio: "Superintendencia de Educación",
          region: "Región Metropolitana de Santiago",
          nombre: "PEDRO",
          apellido: "CASTILLO RIFFO",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Regional Metropolitano/a",
          nivel: "II",
          fecha_nombramiento: "2018-12-17T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "M",
          estado_cd: "Elaboración",
          rut: "7818274-1",
          alerta0: "19 dic 2018",
          nombre_corregido: "Pedro",
          apellido_corregido: "Castillo Riffo",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2018-12-17T00:00:00.000Z",
          fecha_propuesta: "2019-01-16T00:00:00.000Z",
          fecha_suscripcion: "2019-02-15T00:00:00.000Z",
          fecha_comunicacion: "2019-04-22T00:00:00.000Z",
          eval_semestral_inicio: "2019-06-17T00:00:00.000Z",
          eval_semestral_auto: "2019-07-17T00:00:00.000Z",
          eval_semestral_retro: "2019-08-16T00:00:00.000Z",
          eval_anual_inicio: "2019-12-17T00:00:00.000Z",
          eval_anual_auto: "2020-01-17T00:00:00.000Z",
          eval_anual_retro: "2020-02-16T00:00:00.000Z",
          eval_anual_rex: "2020-02-21T00:00:00.000Z",
          indice: 0,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4269",
          ministerio: "Ministerio de Educación",
          servicio: "Junta Nacional de Jardines Infantiles",
          region: "Región Metropolitana de Santiago",
          nombre: "ANDRÉS RICARDO",
          apellido: "CARVAJAL RATH",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Departamento Recursos Financieros",
          nivel: "II",
          fecha_nombramiento: "2019-01-01T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "M",
          estado_cd: "Suscrito",
          rut: "8366458-4",
          alerta0: "19 dic 2018",
          nombre_corregido: "Andrés Ricardo",
          apellido_corregido: "Carvajal Rath",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-01-01T00:00:00.000Z",
          fecha_propuesta: "2019-01-31T00:00:00.000Z",
          fecha_suscripcion: "2019-03-02T00:00:00.000Z",
          fecha_comunicacion: "2019-05-07T00:00:00.000Z",
          eval_semestral_inicio: "2019-07-01T00:00:00.000Z",
          eval_semestral_auto: "2019-08-01T00:00:00.000Z",
          eval_semestral_retro: "2019-08-31T00:00:00.000Z",
          eval_anual_inicio: "2020-01-01T00:00:00.000Z",
          eval_anual_auto: "2020-02-01T00:00:00.000Z",
          eval_anual_retro: "2020-03-02T00:00:00.000Z",
          eval_anual_rex: "2020-03-09T00:00:00.000Z",
          indice: 1,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4188",
          ministerio: "Ministerio de Educación",
          servicio: "Superintendencia de Educación",
          region: "Región de Magallanes y Antártica Chilena",
          nombre: "SAFIRA MAGDALENA",
          apellido: "IVELICH GALLARDO",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Regional Magallanes",
          nivel: "II",
          fecha_nombramiento: "2019-01-03T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "F",
          estado_cd: "Suscrito",
          rut: "8905787-6",
          alerta0: "8 ene 2019",
          nombre_corregido: "Safira Magdalena",
          apellido_corregido: "Ivelich Gallardo",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-01-03T00:00:00.000Z",
          fecha_propuesta: "2019-02-02T00:00:00.000Z",
          fecha_suscripcion: "2019-03-04T00:00:00.000Z",
          fecha_comunicacion: "2019-05-09T00:00:00.000Z",
          eval_semestral_inicio: "2019-07-03T00:00:00.000Z",
          eval_semestral_auto: "2019-08-03T00:00:00.000Z",
          eval_semestral_retro: "2019-09-02T00:00:00.000Z",
          eval_anual_inicio: "2020-01-03T00:00:00.000Z",
          eval_anual_auto: "2020-02-03T00:00:00.000Z",
          eval_anual_retro: "2020-03-04T00:00:00.000Z",
          eval_anual_rex: "2020-03-11T00:00:00.000Z",
          indice: 2,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4143",
          ministerio: "Ministerio de Educación",
          servicio: "Superintendencia de Educación",
          region: "Region de Tarapacá",
          nombre: "RICARDO SERVANDO",
          apellido: "VILLALBA PEDREROS",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Regional Tarapacá",
          nivel: "II",
          fecha_nombramiento: "2019-01-06T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "M",
          estado_cd: "Suscrito",
          rut: "10567024-9",
          alerta0: "8 ene 2019",
          nombre_corregido: "Ricardo Servando",
          apellido_corregido: "Villalba Pedreros",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-01-06T00:00:00.000Z",
          fecha_propuesta: "2019-02-05T00:00:00.000Z",
          fecha_suscripcion: "2019-03-07T00:00:00.000Z",
          fecha_comunicacion: "2019-05-10T00:00:00.000Z",
          eval_semestral_inicio: "2019-07-06T00:00:00.000Z",
          eval_semestral_auto: "2019-08-06T00:00:00.000Z",
          eval_semestral_retro: "2019-09-05T00:00:00.000Z",
          eval_anual_inicio: "2020-01-06T00:00:00.000Z",
          eval_anual_auto: "2020-02-06T00:00:00.000Z",
          eval_anual_retro: "2020-03-07T00:00:00.000Z",
          eval_anual_rex: "2020-03-13T00:00:00.000Z",
          indice: 3,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4127",
          ministerio: "Ministerio de Educación",
          servicio: "Superintendencia de Educación",
          region: "Región de Coquimbo",
          nombre: "JULIÁN MANUEL",
          apellido: "GONZÁLEZ MALLEA",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Regional Coquimbo",
          nivel: "II",
          fecha_nombramiento: "2019-01-07T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "M",
          estado_cd: "Suscrito",
          rut: "5573961-7",
          alerta0: "8 ene 2019",
          nombre_corregido: "Julián Manuel",
          apellido_corregido: "González Mallea",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-01-07T00:00:00.000Z",
          fecha_propuesta: "2019-02-06T00:00:00.000Z",
          fecha_suscripcion: "2019-03-08T00:00:00.000Z",
          fecha_comunicacion: "2019-05-13T00:00:00.000Z",
          eval_semestral_inicio: "2019-07-07T00:00:00.000Z",
          eval_semestral_auto: "2019-08-07T00:00:00.000Z",
          eval_semestral_retro: "2019-09-06T00:00:00.000Z",
          eval_anual_inicio: "2020-01-07T00:00:00.000Z",
          eval_anual_auto: "2020-02-07T00:00:00.000Z",
          eval_anual_retro: "2020-03-08T00:00:00.000Z",
          eval_anual_rex: "2020-03-13T00:00:00.000Z",
          indice: 4,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4094",
          ministerio: "Ministerio de Educación",
          servicio: "Superintendencia de Educación",
          region: "Región Metropolitana de Santiago",
          nombre: "MARÍA LUISA",
          apellido: "ORELLANA CAMPBELL",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Intendente de Educación Parvularia",
          nivel: "II",
          fecha_nombramiento: "2019-01-11T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "F",
          estado_cd: "Suscrito",
          rut: "12455085-8",
          alerta0: "14 ene 2019",
          nombre_corregido: "María Luisa",
          apellido_corregido: "Orellana Campbell",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-01-11T00:00:00.000Z",
          fecha_propuesta: "2019-02-10T00:00:00.000Z",
          fecha_suscripcion: "2019-03-12T00:00:00.000Z",
          fecha_comunicacion: "2019-05-17T00:00:00.000Z",
          eval_semestral_inicio: "2019-07-11T00:00:00.000Z",
          eval_semestral_auto: "2019-08-11T00:00:00.000Z",
          eval_semestral_retro: "2019-09-10T00:00:00.000Z",
          eval_anual_inicio: "2020-01-11T00:00:00.000Z",
          eval_anual_auto: "2020-02-11T00:00:00.000Z",
          eval_anual_retro: "2020-03-12T00:00:00.000Z",
          eval_anual_rex: "2020-03-19T00:00:00.000Z",
          indice: 5,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4278",
          ministerio: "Ministerio de Educación",
          servicio: "Junta Nacional de Jardines Infantiles",
          region: "Región de Los Lagos",
          nombre: "EDUARDO ANTONIO",
          apellido: "HERNÁNDEZ AGURTO",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Regional, Región de Los Lagos",
          nivel: "II",
          fecha_nombramiento: "2019-01-18T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "M",
          estado_cd: "Suscrito",
          rut: "12922056-2",
          alerta0: "8 ene 2019",
          nombre_corregido: "Eduardo Antonio",
          apellido_corregido: "Hernández Agurto",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-01-18T00:00:00.000Z",
          fecha_propuesta: "2019-02-17T00:00:00.000Z",
          fecha_suscripcion: "2019-03-19T00:00:00.000Z",
          fecha_comunicacion: "2019-05-24T00:00:00.000Z",
          eval_semestral_inicio: "2019-07-18T00:00:00.000Z",
          eval_semestral_auto: "2019-08-18T00:00:00.000Z",
          eval_semestral_retro: "2019-09-17T00:00:00.000Z",
          eval_anual_inicio: "2020-01-18T00:00:00.000Z",
          eval_anual_auto: "2020-02-18T00:00:00.000Z",
          eval_anual_retro: "2020-03-19T00:00:00.000Z",
          eval_anual_rex: "2020-03-26T00:00:00.000Z",
          indice: 6,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4267",
          ministerio: "Ministerio de Educación",
          servicio: "Junta Nacional de Jardines Infantiles",
          region: "Región del Bio Bio",
          nombre: "ALEJANDRA PATRICIA",
          apellido: "NAVARRETE VILLA",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Regional, Región del Bío-Bío",
          nivel: "II",
          fecha_nombramiento: "2019-01-28T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "F",
          estado_cd: "Suscrito",
          rut: "12969848-9",
          alerta0: "22 ene 2019",
          nombre_corregido: "Alejandra Patricia",
          apellido_corregido: "Navarrete Villa",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-01-28T00:00:00.000Z",
          fecha_propuesta: "2019-02-27T00:00:00.000Z",
          fecha_suscripcion: "2019-03-29T00:00:00.000Z",
          fecha_comunicacion: "2019-06-03T00:00:00.000Z",
          eval_semestral_inicio: "2019-07-28T00:00:00.000Z",
          eval_semestral_auto: "2019-08-28T00:00:00.000Z",
          eval_semestral_retro: "2019-09-27T00:00:00.000Z",
          eval_anual_inicio: "2020-01-28T00:00:00.000Z",
          eval_anual_auto: "2020-02-28T00:00:00.000Z",
          eval_anual_retro: "2020-03-29T00:00:00.000Z",
          eval_anual_rex: "2020-04-03T00:00:00.000Z",
          indice: 7,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4347",
          ministerio: "Ministerio de Educación",
          servicio: "Superintendencia de Educación",
          region: "Región Metropolitana de Santiago",
          nombre: "SANDRA XIMENA",
          apellido: "PÉREZ VERGARA",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Jefe/a de División Función Fiscalización",
          nivel: "II",
          fecha_nombramiento: "2019-02-01T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "F",
          estado_cd: "Suscrito",
          rut: "12722227-4",
          alerta0: "22 ene 2019",
          nombre_corregido: "Sandra Ximena",
          apellido_corregido: "Pérez Vergara",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-02-01T00:00:00.000Z",
          fecha_propuesta: "2019-03-03T00:00:00.000Z",
          fecha_suscripcion: "2019-04-02T00:00:00.000Z",
          fecha_comunicacion: "2019-06-07T00:00:00.000Z",
          eval_semestral_inicio: "2019-08-01T00:00:00.000Z",
          eval_semestral_auto: "2019-09-01T00:00:00.000Z",
          eval_semestral_retro: "2019-10-01T00:00:00.000Z",
          eval_anual_inicio: "2020-02-01T00:00:00.000Z",
          eval_anual_auto: "2020-03-01T00:00:00.000Z",
          eval_anual_retro: "2020-03-31T00:00:00.000Z",
          eval_anual_rex: "2020-04-07T00:00:00.000Z",
          indice: 8,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
        {
          concurso: "4008",
          ministerio: "Ministerio de Educación",
          servicio: "Junta Nacional de Auxilio Escolar y Becas",
          region: "Región de Coquimbo",
          nombre: "WILLIAM RODRIGO",
          apellido: "GUTIÉRREZ YÁÑEZ",
          mail: "yolivares@serviciocivil.cl",
          cargo: "Director/a Regional Coquimbo",
          nivel: "II",
          fecha_nombramiento: "2019-02-04T00:00:00.000Z",
          estado_adp: "Nombrado (primer periodo)",
          sexo: "M",
          estado_cd: "Suscrito",
          rut: "12220767-6",
          alerta0: "29 ene 2019",
          nombre_corregido: "William Rodrigo",
          apellido_corregido: "Gutiérrez Yáñez",
          alerta_cero: "Sí",
          mail_contraparte_cd: "yolivares@serviciocivil.cl",
          mail_contraparte_eval: "yolivares@serviciocivil.cl",
          fecha_nombramiento_renovacion: "2019-02-04T00:00:00.000Z",
          fecha_propuesta: "2019-03-06T00:00:00.000Z",
          fecha_suscripcion: "2019-04-05T00:00:00.000Z",
          fecha_comunicacion: "2019-06-10T00:00:00.000Z",
          eval_semestral_inicio: "2019-08-04T00:00:00.000Z",
          eval_semestral_auto: "2019-09-04T00:00:00.000Z",
          eval_semestral_retro: "2019-10-04T00:00:00.000Z",
          eval_anual_inicio: "2020-02-04T00:00:00.000Z",
          eval_anual_auto: "2020-03-04T00:00:00.000Z",
          eval_anual_retro: "2020-04-03T00:00:00.000Z",
          eval_anual_rex: "2020-04-10T00:00:00.000Z",
          indice: 9,
          img: "https://images.unsplash.com/photo-1584413544514-68a49c9b59e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80",
        },
      ],
    };
  },
  methods: {
    // Filtros
    filtroPorNombreDeServicio(adps) {
      return adps.filter((adp) => !adp.servicio.indexOf(this.servicio));
    },
    filtroPorEstadoConvenio(adps) {
      return adps.filter((adp) => !adp.estado_cd.indexOf(this.estadoConvenio));
    },
    filtroPorConcurso(adps) {
      return adps.filter((adp) => !adp.concurso.indexOf(this.concurso));
    },
    filtroPorNombreADP(adps) {
      return adps.filter(
        (adp) =>
          !adp.nombre_corregido
            .toLowerCase()
            .indexOf(this.nombreADP.toLowerCase())
      );
    },
    // APIs
    sendEmail(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/mailgun/MWpAmzASqYMhVxwW/send",
        params: {
          senderName: "Yerson",
          senderEmail: "yolivares@serviciocivil.cl",
          to: this.adps[i].mail,
          subject: "Hola" + this.adps[i].nombre_corregido,
          template: "prueba",
        },
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addToCalendar(i) {
      axios({
        method: "post",
        url: "https://v1.nocodeapi.com/yerigagarin/calendar/kPSHlVqrfCmjOchV/event?maxAttendees=1&sendNotifications=true&sendUpdates=none",
        params: {},
        data: {
          summary: `Noventa días de ${this.adps[i].nombre_corregido} ${this.adps[i].apellido_corregido} [${this.adps[i].concurso}]`,
          description: `El concurso ${this.adps[i].concurso} se encuentra próximo al cumplimiento de los 90 días.`,
          start: {
            dateTime: `${
              this.adps[i].fecha_comunicacion.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          end: {
            dateTime: `${
              this.adps[i].fecha_comunicacion.split("T00:00:00.000Z")[0]
            }T8:00:00-03:00`,
            timeZone: "GMT",
          },
          sendNotifications: true,
          attendees: [
            {
              email: "yolivares@serviciocivil.cl",
            },
          ],
        },
      })
        .then(function (response) {
          // handle success
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
  },
  computed: {
    filtrarADPs() {
      return this.filtroPorConcurso(
        this.filtroPorNombreDeServicio(
          this.filtroPorNombreADP(this.filtroPorEstadoConvenio(this.adps))
        )
      );
    },
    concursoMasActual() {
      const arregloConcursos = this.adps;
      return Math.max.apply(
        Math,
        arregloConcursos.map((n) => {
          return n.concurso;
        })
      );
    },
    // ...mapState(["adps"]),
  },
  created() {
    this.concurso = this.concursoMasActual;
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
}

.cursor {
  cursor: copy;
}

.fotoPerfil {
  height: 7rem;
  width: 7rem;
}

#convenioSuscrito {
  color: green;
}
</style>
