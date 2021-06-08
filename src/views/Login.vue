<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="acceder()">
      <input
        type="email"
        placeholder="Email"
        class="form-control"
        v-model="usuario.email"
      />
      <input
        type="text"
        placeholder="Contraseña"
        class="form-control"
        v-model="usuario.contraseña"
      />
      <button type="submit">Acceder</button>
    </form>
    <div v-if="mensaje !== ''">
      <p>{{ mensaje }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      usuario: {
        email: "",
        contraseña: "",
      },
      mensaje: "",
    };
  },
  methods: {
    ...mapActions(["guardarUsuario"]),
    acceder() {
      const data = {
        login: this.usuario.email,
        password: this.usuario.contraseña,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          "https://api.backendless.com/8E969F27-4B80-2894-FFAC-1C9B47280100/0C0C74DA-1088-4454-8FF9-FEBA86B24150/users/login",
          data,
          headers
        )
        .then((res) => {
          const resp = { token: res.data["user-token"], user: res.data.email };
          this.guardarUsuario(resp);
        })
        .catch((e) => (this.mensaje = e));
    },
  },
};
</script>

<style>
</style>