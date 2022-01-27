<template>
  <main :class="this.$route.path !== '/' ? conteiner : sidebarHide">
    <div class="sidebar" v-show="this.$route.path !== '/'">
      <Sidebar />
    </div>
    <div class="main">
      <router-view />
    </div>
  </main>
</template>

<script>
import Sidebar from "@/components/navegacion/Sidebar.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components: {
    Sidebar,
  },
  data() {
    return {
      sidebarHide: "sidebarHide",
      conteiner: "conteiner",
    };
  },
  metaInfo: {
    title: "SEA",
    titleTemplate: "%s | Sistema de Envío de Alertas",
    htmlAttrs: {
      lang: "es",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: "Sistema de Envío de Alertas",
      },
    ],
    script: [
      {
        src: "https://plausible.io/js/plausible.js",
        "data-domain": "sea-adp.netlify.app",
        defer: true,
      },
    ],
    script: [
      {
        src: "https://smtpjs.com/v3/smtp.js",
        defer: true,
      },
    ],
  },
  methods: {
    ...mapActions(["fetch_Adp", "fetch_EstadoSICDE"]),
    fetchAdp() {
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbxOVp8dMaTZYznfrzAvO4g8Lj_Fo3k6MUGRv806R2VVljJAjnZj9_pbtisUce3OV-PUhA/exec"
        )
        .then(({ data: { data } }) => {
          this.fetch_Adp(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    estadoSICDE() {
      axios
        .get(
          "https://v1.nocodeapi.com/yerigagarin/uptime/AUpowmIbIGdzFDkI?monitors=789280592"
        )
        .then(({ data: { stat } }) => {
          this.fetch_EstadoSICDE(stat);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchAdp();
    this.estadoSICDE();
  },
};
</script>


<style lang="scss">
#convenioSuscrito {
  color: green;
}

#convenioNulo {
  color: rgb(180, 34, 90);
}

.cursor {
  cursor: pointer;
}

.sinPadding {
  padding: 0 !important;
}

.conteiner {
  display: grid;
  grid-template-columns: 3.12em 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.sidebar {
  grid-area: 1 / 1 / 2 / 3;
}

.main {
  grid-area: 1 / 2 / 2 / 3;
}

.sidebarHide {
  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
}

#noMargin {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.linksNavbar {
  color: #fff;
  text-decoration: none;
  &:visited {
    color: white;
  }
  &:hover {
    color: white;
  }
  &:focus {
    color: white;
  }
  &:active {
    color: white;
  }
}

.vsm--icon {
  padding: 5px;
}
</style>
