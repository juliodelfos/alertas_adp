<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <img src="@/assets/SC.png" alt="Logo Servicio Civil" />
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="napellido@serviciocivil.cl"
          v-model="form.email"
        />
        <label for="floatingInput">Correo institucional</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
          v-model="form.password"
        />
        <label for="floatingPassword">Contraseña</label>
      </div>
      <b-button variant="primary" class="w-100 btn" type="submit">
        Ingresar
      </b-button>
    </form>
  </main>
</template>


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

<script>
import firebase from "firebase";
import Vue from "vue";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(({ user: { email } }) => {
          this.$router.replace({ name: "Tarjetas" });
          Vue.$toast.success(`Bienvenida ${email}`);
        })
        .catch(({ message }) => {
          this.error = message;
        });
    },
  },
};
</script>
