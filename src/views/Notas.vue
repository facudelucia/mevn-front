<template>
  <div class="container">
    <h1>Notas</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>
    <form @submit.prevent="agregarNota()" v-if="!editar">
      <h3>Agregar nueva nota</h3>
      <input
        type="text"
        placeholder="Nombre"
        class="form-control"
        v-model="nota.title"
      />
      <input
        type="text"
        placeholder="Descripcion"
        class="form-control"
        v-model="nota.completed"
      />
      <b-button class="btn-success" type="submit">Agregar</b-button>
    </form>
    <form @submit.prevent="actualizarNota()" v-if="editar">
      <h3>Editar nueva nota</h3>
      <input
        type="text"
        placeholder="Nombre"
        class="form-control"
        v-model="notaSelected.title"
      />
      <input
        type="text"
        placeholder="Descripcion"
        class="form-control"
        v-model="notaSelected.completed"
      />
      <b-button class="btn-success" type="submit">Actualizar</b-button>
      <b-button class="btn-success" type="submit" @click="editar = false"
        >Cancelar</b-button
      >
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in notas" :key="index">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.completed }}</td>
          <td>
            <b-button @click="eliminarNota(item.id)">Eliminar</b-button>
            <b-button @click="activarNota(item.id)">Editar</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      notas: [],
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
      nota: { title: "", completed: "" },
      editar: false,
      notaSelected: {},
    };
  },
  created() {
    this.listarNotas();
  },
  methods: {
    actualizarNota() {
      axios
        .put(
          `https://jsonplaceholder.typicode.com/todos/${this.notaSelected.id}`,
          this.notaSelected
        )
        .then((res) => {
          console.log(res.data);
          this.notas = this.notas.map((item) =>
            item.id === this.notaSelected.id ? res.data : item
          );
          this.editar = false;
          this.notaSelected = {};
          this.alerta("success", "nota actualizada")
        });
    },
    activarNota(id) {
      this.editar = true;
      axios
        .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => {
          this.notaSelected = res.data;
        });
    },
    alerta(color, nombre) {
      this.mensaje.color = color;
      this.mensaje.texto = nombre;
      this.showAlert();
    },
    listarNotas() {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          this.notas = res.data.slice(0, 5);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    agregarNota() {
      axios
        .post("https://jsonplaceholder.typicode.com/todos", this.nota)
        .then((res) => {
          this.notas.push(res.data);
          this.nota.title = "";
          this.nota.completed = "";
          this.alerta("success", "nota creada");
        })
        .catch((e) => console.log(e));
    },
    eliminarNota(id) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => {
          this.notas = this.notas.filter((item) => item.id !== id);
          this.alerta("danger", "nota eliminada");
        })
        .catch((e) => console.log(e));
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style>
</style>