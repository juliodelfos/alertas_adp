import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    adps: [],
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
    estadosConvenios: [
      { value: "", text: "Selecciona un estado" },
      // { value: "", text: "No suscritos" },
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
    ],
  },
  mutations: {
    FETCH_ADP(state, data) {
      state.adps = data;
    },
    SOCIAL_LOGIN(state, user) {
      state.user = user;
    },
    SOCIAL_LOGOUT(state) {
      state.user = "";
    },
  },
  actions: {
    fetch_Adp({ commit }, data) {
      commit("FETCH_ADP", data);
    },
    social_Login({ commit }, user) {
      commit("SOCIAL_LOGIN", user);
    },
    social_Logout({ commit }) {
      commit("SOCIAL_LOGOUT");
    },
  },
  getters: { 

  }
  // plugins: [createPersistedState()],

});
