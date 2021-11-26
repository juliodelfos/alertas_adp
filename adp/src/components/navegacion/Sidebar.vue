<template>
  <div>
    <sidebar-menu :menu="menu"  widthCollapsed="3.12rem" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Navegación",
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
        {
          header: true,
          title: "Más información",
          hiddenOnCollapse: true,
        },
        {
          href: "https://stats.uptimerobot.com/LG7nQhkY42",
          external: true,
          title: "Estado SICDE",
          icon: "fa fa-check-circle",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
