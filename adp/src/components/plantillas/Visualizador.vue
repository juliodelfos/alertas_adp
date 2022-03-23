<template>
  <b-container class="py-4">
    <b-row>
      <b-col cols="6">
        <b-row>
          <div>
            <h2 class="fs-5">Visualizar plantillas</h2>
            <p>Selecciona qué plantilla quieres ver</p>
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>
          </div>
        </b-row>
        <b-row>
          <textarea v-model="plantilla" placeholder="Pegar HTML"></textarea>
        </b-row>
      </b-col>
      <b-col cols="6">
        <div v-html="selected"></div>
        <div v-html="plantilla"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { cuerpoClaveAPP } from "@/plantillasMail.js";
import { cuerpoAlertaCero } from "@/plantillasMail.js";
import { cuerpoAlertaCeroRenovado } from "@/plantillasMail.js";
import { cuerpoAlertaSesenta } from "@/plantillasMail.js";
import { cuerpoAlertaNoventa } from "@/plantillasMail.js";
import { cuerpoClaveSICDE } from "@/plantillasMail.js";
import { cuerpoBienvenidaNombrado } from "@/plantillasMail.js";
import { cuerpoBienvenidaRenovado } from "@/plantillasMail.js";
import { cuerpoEncuestaCierre } from "@/plantillasMail.js";
import { cuerpoEncuestaPercepcion } from "@/plantillasMail.js";
import { cuerpoAutoEvalParcialPendiente } from "@/plantillasMail.js";
import { cuerpoAutoEvalAnualPendiente } from "@/plantillasMail.js";
import { cuerpoRexEvalAnualPendiente } from "@/plantillasMail.js";
import { cuerpoEvaluacionesMensuales } from "@/plantillasMail.js";

export default {
  name: "Visualizador",
  data() {
    return {
      plantilla: "",
      selected: null,
      options: [
        { value: null, text: "Selecciona una plantilla" },
        { value: cuerpoClaveAPP(), text: "Clave APP" },
        { value: cuerpoAlertaCero(), text: "Alerta Cero" },
        { value: cuerpoAlertaCeroRenovado(), text: "Alerta Cero Renovado" },
        { value: cuerpoAlertaSesenta(), text: "Alerta Sesenta" },
        { value: cuerpoAlertaNoventa(), text: "Alerta Noventa" },
        { value: cuerpoClaveSICDE(), text: "Clave SICDE" },
        { value: cuerpoBienvenidaNombrado(), text: "Bienvenida Nombrado" },
        { value: cuerpoBienvenidaRenovado(), text: "Bienvenida Renovado" },
        { value: cuerpoEncuestaCierre(), text: "Encuesta Cierre" },
        { value: cuerpoEncuestaPercepcion(), text: "Encuesta Percepción" },
        {
          value: cuerpoAutoEvalParcialPendiente(),
          text: "Evaluación Parcial Pendiente",
        },
        {
          value: cuerpoAutoEvalAnualPendiente(),
          text: "Evaluación Anual Pendiente",
        },
        {
          value: cuerpoRexEvalAnualPendiente(),
          text: "REX Evaluación Parcial Pendiente",
        },
        {
          value: cuerpoEvaluacionesMensuales(),
          text: "Evaluaciones Mensuales",
        },
      ],
    };
  },
};
</script>

<style>
</style>