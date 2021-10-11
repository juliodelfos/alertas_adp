<template>
  <main class="form-signin">
    <form>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/dnsc-ccaf2.appspot.com/o/Logo%20blanco.png?alt=media&token=a7238305-c52c-4d5a-801c-d979626c3651"
        alt="Logo Servicio Civil"
      />
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="napellido@serviciocivil.cl"
          v-model="acceso.user"
        />
        <label for="floatingInput">Correo institucional</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
          v-model="acceso.password"
        />
        <label for="floatingPassword">Contraseña</label>
      </div>
      <b-button
        variant="primary"
        class="w-100 btn"
        type="submit"
        @click="login"
      >
        Ingresar
      </b-button>
    </form>
  </main>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      acceso: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["social_Login"]),
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.acceso.user, this.acceso.password)
        .then(
          (accept) => {
            this.$router.push("general");
            // this.$router.replace({ name: "GrupoCards" });
            this.social_Login(accept.user);
          },
          (reject) => console.log("Error", reject)
        );
    },
  },
};
</script>

<style scoped lang="scss">
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

img {
  width: 90%;
  padding-bottom: 1rem;
}
</style>
