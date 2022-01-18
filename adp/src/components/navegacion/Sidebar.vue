<template>
  <div>
    <sidebar-menu
      :menu="menu"
      widthCollapsed="3.12rem"
      :collapsed="collapsed"
      @item-click="signOut"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  name: "Sidebar",
  data() {
    return {
      collapsed: true,
      menu: [
        {
          header: true,
          title: "Vistas",
          hiddenOnCollapse: true,
        },
        {
          href: { path: "/tarjetas" },
          title: "Tarjetas",
          icon: "fa fa-id-card",
        },
        {
          href: { path: "/tabla" },
          title: "Tabla",
          icon: "fa fa-table",
        },
        // {
        //   href: { path: "/correos-masivos" },
        //   title: "Correos masivos",
        //   icon: "fa fa-envelope-square",
        // },
        {
          href: { path: "/evaluaciones-mensuales" },
          title: "Evaluaciones mensuales",
          icon: "fa fa-mail-bulk",
        },
        {
          header: true,
          title: "Más información",
          hiddenOnCollapse: true,
        },
        {
          href: "https://stats.uptimerobot.com/LG7nQhkY42",
          external: true,
          title: "Estado SICDE",
          icon: "fa fa-info-circle",
        },
        {
          header: true,
          title: "Opciones",
          hiddenOnCollapse: true,
        },
        {
          title: "Salir",
          icon: "fa fa-sign-out-alt",
        },
      ],
    };
  },
  methods: {
    signOut({ type }, { title }, { _uid }) {
      if (title === "Salir") {
        firebase
          .auth()
          .signOut()
          .then(() =>
            this.$router.replace({
              name: "Inicio",
            })
          );
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

