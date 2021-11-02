<template>
  <div>
    <aside class="text-center text-white">
      <div class="logo"></div>
      <ul>
        <li>
          <router-link to="/tarjetas"
            ><b-icon class="h4 my-4" icon="card-heading"></b-icon
          ></router-link>
        </li>
        <li>
          <router-link to="/tabla"
            ><b-icon class="h4" icon="table"></b-icon
          ></router-link>
        </li>
        <hr class="my-3" />
        <li v-if="estado">
          <b-icon
            v-b-tooltip.hover
            title="SICDE operativo"
            class="h4"
            icon="check-circle-fill"
            id="sicdeOperativo"
          ></b-icon>
        </li>
        <li v-else>
          <b-icon
            v-b-tooltip.hover
            title="SICDE está caído"
            class="h3"
            icon="exclamation-circle-fill"
            id="sicdeCaido"
          ></b-icon>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import firebase from "firebase";
export default {
  name: "Sidebar",
  data() {
    return {
      estado: "",
    };
  },
  methods: {
    ...mapActions(["social_Logout"]),

    async estadoSICDE() {
      await axios
        .get(
          "https://v1.nocodeapi.com/yerigagarin/uptime/AUpowmIbIGdzFDkI?monitors=789280592"
        )
        .then((response) => {
          this.estado = response.data.stat;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    socialLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
          location.reload();
        });
      this.social_Logout();
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.estadoSICDE();
  },
};
</script>

<style scoped lang="scss">
* {
  list-style-type: none;
  padding: 0;
}

aside {
  height: 100vh;
}

a {
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

.logo {
  height: 78px;
}

#sicdeOperativo {
  color: #3bd19f;
}

#sicdeCaido {
  color: #c95f68;
}
</style>
