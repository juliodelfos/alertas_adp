<template>
  <div>
    <div class="bg-primary sidebar" v-show="this.$route.path !== '/'">
      <Sidebar />
    </div>
    <router-view />
  </div>
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
  methods: {
    ...mapActions(["fetch_Adp", "fetch_EstadoSICDE"]),
    fetchAdp() {
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbxOVp8dMaTZYznfrzAvO4g8Lj_Fo3k6MUGRv806R2VVljJAjnZj9_pbtisUce3OV-PUhA/exec"
        )
        .then((response) => {
          this.fetch_Adp(response.data.data);
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
        .then((response) => {
          this.fetch_EstadoSICDE(response.data.stat);
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
.fotoPerfil {
  height: 7rem;
  width: 7rem;
}

.fotoPerfilPequena {
  height: 5rem;
  width: 5rem;
}

#convenioSuscrito {
  color: green;
}

.cursor {
  cursor: pointer;
}

.sinPadding {
  padding: 0 !important;
}

#noMargin {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

// .conteiner {
//   display: grid;
//   grid-template-columns: 4% 1fr;
//   grid-template-rows: 1fr;
//   gap: 0px 0px;
//   grid-auto-flow: row;
//   grid-template-areas: "sidebar main";
// }

// .sidebar {
//   grid-area: sidebar;
// }

.main {
  grid-area: main;
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
</style>
