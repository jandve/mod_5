<template>
  <div class="container">
    <h5>Editar Area</h5>

    <div class="card">
      <div class="card-content">
        <form @submit.prevent="Update()">
          <p>Area: <input type="text" v-model="payload.name" required /></p>
          <p>Encargado: <input type="text" v-model="payload.userInCharge" required /></p>
          <p>Empleados: <input type="number" min="0" v-model="payload.amountOfEmployees" required /></p>
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="payload.active" />
              <span>Activo</span>
            </label>
          </p>
          <button type="submit" class="waves-effect waves-light btn-small">Editar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateArea',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      payload: {
        name: null,
        userInCharge: '',
        amountOfEmployees: '',
        active: null,
      },
    };
  },
  methods: {
    getOne() {
      this.axios({
        method: 'get',
        url: this.api + '/area/' + this.$route.params.id,
      })
        .then((response) => {
          this.payload = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update() {
      if (confirm('Esta seguro de editar?.')) {
        this.axios({
          method: 'patch',
          url: this.api + '/area/' + this.$route.params.id,
          data: this.payload,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  components: {},
  mounted() {
    this.getOne();
  },
};
</script>
