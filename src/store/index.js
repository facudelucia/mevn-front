import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || "",
    user: ""
  },
  mutations: {
    obtenerUsuario(state, payload) {
      state.token = payload.token
      if (payload === "") {
        state.user = ""
      } else {
        state.user = payload.user
        router.push({ name: 'Notas' })
      }
    }
  },
  actions: {
    guardarUsuario({ commit }, payload) {
      localStorage.setItem('token', payload.token)
      commit('obtenerUsuario', payload)
    },
    cerrarSesion({ commit }) {
      router.push('/login')
      commit('obtenerUsuario', '')
      localStorage.removeItem('token')
    }
  },
  modules: {
  },
  getters: {
    estaActivo: state => !!state.token
  }
})
