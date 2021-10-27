<template>
  <div>
    <aside class="text-center text-white">
      <div class="logo"></div>
      <ul>
        <li>
          <router-link to="/general"
            ><b-icon class="h3 mt-5" icon="house-door-fill"></b-icon
          ></router-link>
        </li>
        <hr class="my-3" />
        <li><b-icon class="h3" icon="moon"></b-icon></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
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
  text-decoration: none;
  &:visited {
    color: white;
  }
}

.logo {
  height: 78px;
}
</style>
