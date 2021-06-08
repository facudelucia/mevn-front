<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!estaActivo">Login</router-link> |
      <a @click="cerrarSesion()" v-if="estaActivo">Cerrar sesion</a> |
      <router-link to="/notas" v-if="estaActivo">Notas</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
  computed: {
    ...mapGetters(["estaActivo"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
