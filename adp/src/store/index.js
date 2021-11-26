import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    adps: [],
    estadoSICDE: "",
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
        value: "Servicio Local de Educación Costa Araucania",
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
      {
        value: "Instituto de Previsión Social",
        text: "Instituto de Previsión Social",
      },
      {
        value: "Unidad de Análisis Financiero",
        text: "Unidad de Análisis Financiero",
      },
      {
        value: "Superintendencia de Electricidad y Combustibles",
        text: "Superintendencia de Electricidad y Combustibles",
      },
      {
        value: "Parque Metropolitano de Santiago",
        text: "Parque Metropolitano de Santiago",
      },
      {
        value: "Servicio de Tesorerías - Tesorería General de la República",
        text: "Tesorería General de la República",
      },
      {
        value: "Caja de Previsión de la Defensa Nacional",
        text: "Caja de Previsión de la Defensa Nacional",
      },
      {
        value: "Servicio Nacional de Pesca y Acuicultura",
        text: "Servicio Nacional de Pesca y Acuicultura",
      },
      {
        value: "Servicio Nacional del Consumidor",
        text: "Servicio Nacional del Consumidor",
      },
      {
        value: "Oficina Nacional de Emergencia",
        text: "Oficina Nacional de Emergencia",
      },
      {
        value: "Servicio Electoral",
        text: "Servicio Electoral",
      },
      {
        value: "Servicio Medico Legal",
        text: "Servicio Medico Legal",
      },
      {
        value: "Dirección General de Aeronáutica Civil",
        text: "Dirección General de Aeronáutica Civil",
      },
      {
        value: "Instituto Nacional de Propiedad Industrial",
        text: "Instituto Nacional de Propiedad Industrial",
      },
      {
        value: "Superintendencia de Seguridad Social",
        text: "Superintendencia de Seguridad Social",
      },
      {
        value: "Servicio de Salud Metropolitano Sur",
        text: "Servicio de Salud Metropolitano Sur",
      },
      {
        value: "Superintendencia del Medio Ambiente",
        text: "Superintendencia del Medio Ambiente",
      },
      {
        value: "Servicio de Evaluación Ambiental",
        text: "Servicio de Evaluación Ambiental",
      },
      {
        value: "Servicio Agrícola y Ganadero",
        text: "Servicio Agrícola y Ganadero",
      },
      {
        value: "Servicio de Salud Valparaíso - San Antonio",
        text: "Servicio de Salud Valparaíso - San Antonio",
      },
      {
        value: "Servicio de Salud Iquique",
        text: "Servicio de Salud Iquique",
      },
      {
        value: "Servicio de Salud Metropolitano Oriente",
        text: "Servicio de Salud Metropolitano Oriente",
      },
      {
        value: "Servicio de Salud Metropolitano Norte",
        text: "Servicio de Salud Metropolitano Norte",
      },
      {
        value: "Superintendencia de Insolvencia y Reemprendimiento",
        text: "Superintendencia de Insolvencia y Reemprendimiento",
      },
      {
        value: "Instituto de Seguridad Laboral",
        text: "Instituto de Seguridad Laboral",
      },
      {
        value: "Superintendencia de Pensiones",
        text: "Superintendencia de Pensiones",
      },
      {
        value: "Fiscalía del Ministerio de Obras Públicas",
        text: "Fiscalía del Ministerio de Obras Públicas",
      },
      {
        value: "Servicio de Impuestos Internos",
        text: "Servicio de Impuestos Internos",
      },
      {
        value:
          "Servicio Nacional para la Prevención y Rehabilitación del Consumo de Drogas y Alcohol",
        text:
          "Servicio Nacional para la Prevención y Rehabilitación del Consumo de Drogas y Alcohol",
      },
      {
        value: "Servicio de Salud Concepción",
        text: "Servicio de Salud Concepción",
      },
      {
        value: "Junta de Aeronáutica Civil",
        text: "Junta de Aeronáutica Civil",
      },
      {
        value: "Dirección de Obras Hidráulicas",
        text: "Dirección de Obras Hidráulicas",
      },
      {
        value: "Dirección Nacional de Fronteras y Límites",
        text: "Dirección Nacional de Fronteras y Límites",
      },
      {
        value: "Servicio Nacional de la Discapacidad",
        text: "Servicio Nacional de la Discapacidad",
      },
      {
        value: "Servicio Nacional de Turismo",
        text: "Servicio Nacional de Turismo",
      },
      {
        value: "Agencia Nacional de Investigación y Desarrollo de Chile",
        text: "Agencia Nacional de Investigación y Desarrollo de Chile",
      },
      {
        value: "Servicio de Salud Maule",
        text: "Servicio de Salud Maule",
      },
      {
        value: "Defensoría Penal Pública",
        text: "Defensoría Penal Pública",
      },
      {
        value: "Servicio de Salud Araucanía Norte",
        text: "Servicio de Salud Araucanía Norte",
      },
      {
        value: "Dirección de Compras y Contratación Pública",
        text: "Dirección de Compras y Contratación Pública",
      },
      {
        value: "Servicio de Salud Araucanía Sur",
        text: "Servicio de Salud Araucanía Sur",
      },
      {
        value: "Instituto Salud Pública",
        text: "Instituto Salud Pública",
      },
      {
        value:
          "Central de Abastecimiento del Sistema Nacional de Servicios de Salud",
        text: "Central de Abastecimiento",
      },
      {
        value: "Fiscalía Nacional Económica",
        text: "Fiscalía Nacional Económica",
      },
      {
        value: "Servicio de Salud Bío - Bío",
        text: "Servicio de Salud Bío - Bío",
      },
      {
        value: "Servicio Nacional de Aduanas",
        text: "Servicio Nacional de Aduanas",
      },
      {
        value: "Instituto Nacional de Hidráulica",
        text: "Instituto Nacional de Hidráulica",
      },
      {
        value: "Instituto Nacional de Estadísticas",
        text: "Instituto Nacional de Estadísticas",
      },
      {
        value: "Servicio de Registro Civil e Identificación",
        text: "Servicio de Registro Civil e Identificación",
      },
      {
        value: "Comisión Nacional de Energía",
        text: "Comisión Nacional de Energía",
      },
      {
        value: "Agencia de promoción de la inversión extranjera",
        text: "Agencia de promoción de la inversión extranjera",
      },
      {
        value: "Comisión Chilena de Energía Nuclear",
        text: "Comisión Chilena de Energía Nuclear",
      },
      {
        value: "Superintendencia de Casinos de Juego",
        text: "Superintendencia de Casinos de Juego",
      },
      {
        value: "Servicio de Salud Metropolitano Suroriente",
        text: "Servicio de Salud Metropolitano Suroriente",
      },
      {
        value: "Servicio de Salud Antofagasta",
        text: "Servicio de Salud Antofagasta",
      },
      {
        value: "Servicio de Salud Aysén",
        text: "Servicio de Salud Aysén",
      },
      {
        value: "Servicio de Salud Metropolitano Occidente",
        text: "Servicio de Salud Metropolitano Occidente",
      },
      {
        value: "Servicio de Salud Talcahuano",
        text: "Servicio de Salud Talcahuano",
      },
      {
        value: "Servicio Nacional del Patrimonio",
        text: "Servicio Nacional del Patrimonio",
      },
      {
        value: "Instituto Nacional de Deportes",
        text: "Instituto Nacional de Deportes",
      },
      {
        value: "Superintendencia de Servicios Sanitarios",
        text: "Superintendencia de Servicios Sanitarios",
      },
      {
        value: "Junta Nacional de Auxilio Escolar y Becas",
        text: "Junta Nacional de Auxilio Escolar y Becas",
      },
      {
        value: "Centro de Referencia de Salud Peñalolén Cordillera Oriente",
        text: "Centro de Referencia de Salud Peñalolén Cordillera Oriente",
      },
      {
        value: "Instituto Antártico Chileno",
        text: "Instituto Antártico Chileno",
      },
      {
        value: "Servicio de Salud Valdivia",
        text: "Servicio de Salud Valdivia",
      },
      {
        value: "Servicio de Salud Aconcagua",
        text: "Servicio de Salud Aconcagua",
      },
      {
        value: "Fondo Nacional de Salud",
        text: "Fondo Nacional de Salud",
      },
      {
        value: "Instituto de Desarrollo Agropecuario",
        text: "Instituto de Desarrollo Agropecuario",
      },
      {
        value: "Servicio Nacional del Menor",
        text: "Servicio Nacional del Menor",
      },
      {
        value: "Dirección de Previsión de Carabineros de Chile",
        text: "Dirección de Previsión de Carabineros de Chile",
      },
      {
        value: "Fondo de Solidaridad e Inversión Social",
        text: "Fondo de Solidaridad e Inversión Social",
      },
      {
        value: "Servicio Nacional del Adulto Mayor",
        text: "Servicio Nacional del Adulto Mayor",
      },
      {
        value: "Servicio de Salud del Libertador Bernardo O'Higgins",
        text: "Servicio de Salud del Libertador Bernardo O'Higgins",
      },
      {
        value: "Junta Nacional de Jardines Infantiles",
        text: "Junta Nacional de Jardines Infantiles",
      },
      {
        value: "Dirección General de Aguas",
        text: "Dirección General de Aguas",
      },
      {
        value: "Servicio de Salud Viña del Mar - Quillota",
        text: "Servicio de Salud Viña del Mar - Quillota",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región de Los Lagos",
        text: "Servicio de Vivienda y Urbanización Región de Los Lagos",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Bdo. OHiggins",
        text: "Servicio de Vivienda y Urbanización Región Bdo. OHiggins",
      },
      {
        value: "Dirección de Arquitectura",
        text: "Dirección de Arquitectura",
      },
      {
        value: "Servicio Nacional de Capacitación y Empleo",
        text: "Servicio Nacional de Capacitación y Empleo",
      },
      {
        value: "Instituto Nacional de la Juventud",
        text: "Instituto Nacional de la Juventud",
      },
      {
        value: "Dirección de Aeropuertos",
        text: "Dirección de Aeropuertos",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Metropolitana",
        text: "Servicio de Vivienda y Urbanización Región Metropolitana",
      },
      {
        value: "Consejo de Rectores",
        text: "Consejo de Rectores",
      },
      {
        value: "Servicio Nacional de la Mujer y la Equidad de Género",
        text: "Servicio Nacional de la Mujer y la Equidad de Género",
      },
      {
        value: "Superintendencia de Salud",
        text: "Superintendencia de Salud",
      },
      {
        value: "Corporación Nacional de Desarrollo Indígena",
        text: "Corporación Nacional de Desarrollo Indígena",
      },
      {
        value: "Dirección de Contabilidad y Finanzas",
        text: "Dirección de Contabilidad y Finanzas",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Valparaíso",
        text: "Servicio de Vivienda y Urbanización Región Valparaíso",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Los Ríos",
        text: "Servicio de Vivienda y Urbanización Región Los Ríos",
      },
      {
        value: "Comisión Nacional de Riego",
        text: "Comisión Nacional de Riego",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Atacama",
        text: "Servicio de Vivienda y Urbanización Región Atacama",
      },
      {
        value: "Servicio de Salud Osorno",
        text: "Servicio de Salud Osorno",
      },
      {
        value: "Servicio de Salud del Reloncaví",
        text: "Servicio de Salud del Reloncaví",
      },
      {
        value: "Oficina de Estudios y Políticas Agrarias",
        text: "Oficina de Estudios y Políticas Agrarias",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Aysén",
        text: "Servicio de Vivienda y Urbanización Región Aysén",
      },
      {
        value: "Dirección del Trabajo",
        text: "Dirección del Trabajo",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Arica y Parinacota",
        text: "Servicio de Vivienda y Urbanización Región Arica y Parinacota",
      },
      {
        value: "Servicio de Salud Chiloé",
        text: "Servicio de Salud Chiloé",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Coquimbo",
        text: "Servicio de Vivienda y Urbanización Región Coquimbo",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Magallanes",
        text: "Servicio de Vivienda y Urbanización Región Magallanes",
      },
      {
        value: "Servicio de Salud Arica",
        text: "Servicio de Salud Arica",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Ñuble",
        text: "Servicio de Vivienda y Urbanización Región Ñuble",
      },
      {
        value: "Dirección de Obras Portuarias",
        text: "Dirección de Obras Portuarias",
      },
      {
        value: "Servicio de Salud Arauco",
        text: "Servicio de Salud Arauco",
      },
      {
        value: "Servicio de Salud Magallanes",
        text: "Servicio de Salud Magallanes",
      },
      {
        value: "Servicio Nacional de Geología y Minería",
        text: "Servicio Nacional de Geología y Minería",
      },
      {
        value: "Servicio de Salud Ñuble",
        text: "Servicio de Salud Ñuble",
      },
      {
        value: "Servicio de Salud Metropolitano Central",
        text: "Servicio de Salud Metropolitano Central",
      },
      {
        value: "Dirección General de Concesiones de Obras Públicas",
        text: "Dirección General de Concesiones de Obras Públicas",
      },
      {
        value: "Gendarmería de Chile",
        text: "Gendarmería de Chile",
      },
      {
        value: "Dirección de Vialidad",
        text: "Dirección de Vialidad",
      },
      {
        value:
          "Agencia Chilena de Cooperación Internacional para el Desarrollo",
        text: "Agencia Chilena de Cooperación Internacional para el Desarrollo",
      },
      {
        value: "Servicio de Salud Coquimbo",
        text: "Servicio de Salud Coquimbo",
      },
      {
        value: "Servicio de Salud Atacama",
        text: "Servicio de Salud Atacama",
      },
      {
        value: "Centro de Referencia de Salud de Maipú",
        text: "Centro de Referencia de Salud de Maipú",
      },
      {
        value: "Dirección General del Crédito Prendario",
        text: "Dirección General del Crédito Prendario",
      },
      {
        value: "Dirección General de Promocion de Exportaciones",
        text: "Dirección General de Promocion de Exportaciones",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región de la Araucanía",
        text: "Servicio de Vivienda y Urbanización Región de la Araucanía",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región del Bío-Bío",
        text: "Servicio de Vivienda y Urbanización Región del Bío-Bío",
      },
      {
        value: "Servicio de Vivienda y Urbanización Región Tarapacá",
        text: "Servicio de Vivienda y Urbanización Región Tarapacá",
      },
      {
        value: "Dirección General de Obras Públicas",
        text: "Dirección General de Obras Públicas",
      },
      {
        value:
          "Instituto Nacional de Desarrollo Sustentable de la Pesca Artesanal y de la Acuicultura de Pequeña Escala",
        text:
          "Instituto Nacional de Desarrollo Sustentable de la Pesca Artesanal y de la Acuicultura de Pequeña Escala",
      },
      {
        value:
          "Servicio Nacional de Protección Especializada a la Niñez y Adolescencia",
        text:
          "Servicio Nacional de Protección Especializada a la Niñez y Adolescencia",
      },
    ],
    ministerios: [
      { value: "", text: "Selecciona un ministerio" },
      { value: "-", text: "Otros" },
      { value: "Ministerio del Trabajo y Previsión Social", text: "Trabajo" },
      { value: "Ministerio de Hacienda", text: "Hacienda" },
      { value: "Ministerio de Energía", text: "Energía" },
      {
        value: "Ministerio de Vivienda y Urbanismo",
        text: "Vivienda y Urbanismo",
      },
      { value: "Ministerio de Defensa Nacional", text: "Defensa" },
      { value: "Ministerio de Educación", text: "Educación" },
      { value: "Ministerio de Economía, Fomento y Turismo", text: "Economía" },
      {
        value: "Ministerio del Interior y Seguridad Pública",
        text: "Interior",
      },
      { value: "Ministerio de Justicia y Derechos Humanos", text: "Justicia" },
      { value: "Ministerio de Salud", text: "Salud" },
      { value: "Ministerio del Medio Ambiente", text: "Medio Ambiente" },
      { value: "Ministerio de Minería", text: "Minería" },
      { value: "Ministerio de Agricultura", text: "Agricultura" },
      { value: "Ministerio de Obras Públicas", text: "Obras Públicas" },
      {
        value: "Ministerio de Transportes y Telecomunicaciones",
        text: "Transportes",
      },
      {
        value: "Ministerio de Relaciones Exteriores",
        text: "Relaciones Exteriores",
      },
      {
        value: "Ministerio de Desarrollo Social y Familia",
        text: "Desarrollo Social",
      },
      {
        value: "Ministerio de Ciencia, Tecnología, Conocimiento e Innovación",
        text: "Ciencia",
      },
      {
        value: "Ministerio de las Culturas, las Artes y el Patrimonio",
        text: "Culturas",
      },
      { value: "Ministerio del Deporte", text: "Deporte" },
      { value: "Ministerio de la Mujer y la Equidad de Género", text: "Mujer" },
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
    FETCH_ESTADOSICDE(state, data) {
      state.estadoSICDE = data;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    fetch_Adp({ commit }, data) {
      commit("FETCH_ADP", data);
    },
    fetch_EstadoSICDE({ commit }, data) {
      commit("FETCH_ESTADOSICDE", data);
    },
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit("SET_USER", null);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  // plugins: [createPersistedState()],
});
