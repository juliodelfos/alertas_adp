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
        />
        <label for="floatingInput">Correo institucional</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
        />
        <label for="floatingPassword">Contraseña</label>
      </div>
      <b-button variant="primary" class="w-100 btn" type="submit">
        Ingresar
      </b-button>
    </form>
  </main>
</template>

<script>
export default {
  name: "HelloWorld",
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
