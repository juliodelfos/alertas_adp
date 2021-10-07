import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adps: [],
  },
  mutations: {
    FETCH_ADP(state, data) {
      state.adps = data;
    },
  },
  actions: {
    fetch_Adp({ commit }, data) {
      commit("FETCH_ADP", data);
    },
  },
  getters: {},
  modules: {},
});
