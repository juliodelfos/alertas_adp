<template>
  <!-- <main class="form-signin">
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
        @click="login()"
      >
        Ingresar
      </b-button>
    </form>
  </main> -->
</template>

<script>
// import firebase from "firebase";
// import { mapActions } from "vuex";

// export default {
//   name: "Login",
//   data() {
//     return {
//       acceso: {
//         user: "",
//         password: "",
//       },
//     };
//   },
//   methods: {
//     ...mapActions(["social_Login"]),
//     login() {
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(this.acceso.user, this.acceso.password)
//         .then(
//           (accept) => {
//             // this.$router.push("tarjetas");
//             console.log(accept);
//             this.$router.replace({ name: "Tarjetas" });
//             // this.social_Login(accept.user);
//           },
//           (reject) => console.log("Error", reject)
//         );
//     },
//   },
// };
</script>

<style scoped lang="scss">
// .form-signin {
//   width: 100%;
//   max-width: 330px;
//   padding: 15px;
//   margin: auto;
// }

// .form-signin input[type="email"] {
//   margin-bottom: -1px;
//   border-bottom-right-radius: 0;
//   border-bottom-left-radius: 0;
// }

// .form-signin input[type="password"] {
//   margin-bottom: 10px;
//   border-top-left-radius: 0;
//   border-top-right-radius: 0;
// }

// img {
//   width: 90%;
//   padding-bottom: 1rem;
// }
</style>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Password</label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import { mapGetters } from "vuex";

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
        .then((data) => {
          this.$router.replace({ name: "Tarjetas" });
          Vue.$toast.success(`Bienvenida ${this.user.data.email}`);
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
