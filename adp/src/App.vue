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
  },
  methods: {
    ...mapActions(["fetch_Adp"]),
    fetchAdp() {
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbzQYkEj7P994qPSROwO5l2jalm_MHFwvuNFHlujKNWyVAqHeaxsksCSancSqqjvZqlA/exec"
        )
        .then(({ data: { data } }) => this.fetch_Adp(data))
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.fetchAdp();
    // let cargaSMTPjs = document.createElement("script");
    // cargaSMTPjs.setAttribute("src", "https://smtpjs.com/v3/smtp.js");
    // document.head.appendChild(cargaSMTPjs);
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
