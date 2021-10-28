<template>
  <div class="conteiner">
    <div class="imagen">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/dnsc-ccaf2.appspot.com/o/5.png?alt=media&token=d70facd5-604e-4c91-aad1-ec43c974e300"
        alt="Ilustración de astronauta con un perro en el espacio"
      />
    </div>
    <div class="a"></div>
    <div class="b"></div>
    <div class="c"></div>
    <div class="d"></div>
    <div class="e"></div>
    <div class="f"></div>
    <div class="g"></div>
    <div class="h"></div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
img {
  width: 70%;
}

.conteiner {
  display: grid;
  grid-template-columns: 0.6fr 2fr 0.4fr;
  grid-template-rows: 0.4fr 2.2fr 0.4fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "a b c"
    "d imagen e"
    "f g h";
}

.imagen {
  grid-area: imagen;
}

.a {
  grid-area: a;
}

.b {
  grid-area: b;
}

.c {
  grid-area: c;
}

.d {
  grid-area: d;
}

.e {
  grid-area: e;
}

.f {
  grid-area: f;
}

.g {
  grid-area: g;
}

.h {
  grid-area: h;
}
</style>