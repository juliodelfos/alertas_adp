<template>
  <div>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="Convenio de desempeño" active> <Convenio /> </b-tab>
      <b-tab title="Evaluaciones semestrales">
        <Semestrales />
      </b-tab>
      <b-tab title="Evaluaciones anuales">
        <Anuales />
      </b-tab>
      <b-tab title="Otras comunicaciones">
        <Otras />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Convenio from "@/components/dashboard/pestanas/Convenio.vue";
import Semestrales from "@/components/dashboard/pestanas/Semestrales.vue";
import Anuales from "@/components/dashboard/pestanas/Anuales.vue";
import Otras from "@/components/dashboard/pestanas/Otras.vue";
export default {
  name: "Tabs",
  components: { Convenio, Semestrales, Anuales, Otras },
};
</script>

<style>
</style>