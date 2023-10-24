<template>
  <div class="container">
    <h5>Assets</h5>

    <div class="card">
      <div class="card-content">
        <form @submit.prevent="nuevo()">
          <h5>Nuevo Asset</h5>
          <p>Type: <input type="text" v-model="payload.type" required /></p>
          <p>Model: <input type="text" v-model="payload.model" required /></p>
          <p>
            Condition:
            <select v-model="payload.condition">
              <option :value="condition" v-for="condition in conditionOptions">{{ condition }}</option>
            </select>
          </p>

          <p>
            Area:
            <select>
              <option v-for="area in areas">{{ area.name }}</option>
            </select>
          </p>
          <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
        </form>
      </div>

      <div class="card-content">
        <form @submit.prevent="getList()">
          <h5>Buscar</h5>
          <p>Search: <input type="search" v-model="search" @search="getList()" /></p>
          <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
        </form>
      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <h5>filtros</h5>
        <div class="input-field">
          <select @change="filter('active', $event.target.value)">
            <option value="" selected>todos</option>
            <option value="true">activo</option>
            <option value="false">inactivo</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Model</th>
              <th>Condition</th>
              <th>Area Id</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in items">
              <td>{{ item.id }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.model }}</td>
              <td>{{ item.condition }}</td>
              <td>{{ item.areaId }}</td>
              <td>{{ item.active ? 'activo' : 'inactivo' }}</td>
              <td>
                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"
                  ><i class="material-icons" @click="eliminar(item.id)">delete</i></a
                >
                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue"
                  ><i class="material-icons" @click="update(item.id)">edit</i></a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import area from '@/views/area/index.vue';

export default {
  name: 'AssetView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      search: '',
      toFilter: '',
      areas: [],
      payload: {
        type: null,
        model: null,
        condition: null,
        areaId: null,
        active: true,
      },
      conditionOptions: ['nuevo', 'usado', 'desuso'],
    };
  },
  methods: {
    filter(name, value) {
      this.toFilter = value === '' ? '' : '&' + name + '=' + value;
      this.getList();
    },
    update(id) {
      this.$router.push('/asset/' + id);
    },
    eliminar(id) {
      if (confirm('Esta seguro de eliminar?.')) {
        this.axios({
          method: 'delete',
          url: this.api + '/asset/' + id,
        })
          .then((response) => {
            this.getList();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    nuevo() {
      this.axios({
        method: 'post',
        url: this.api + '/asset',
        data: this.payload,
      })
        .then((response) => {
          this.getList();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getList(name, value) {
      this.axios({
        method: 'get',
        url: this.api + '/asset?q=' + this.search + this.toFilter,
      })
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getAreasList() {
      try {
        const { data } = await this.axios({
          method: 'get',
          url: this.api + '/area',
        });
        this.areas = data;
      } catch (error) {
        console.log(error);
      }
    },
    initSelect() {
      this.getAreasList();
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems);
    },
  },
  async mounted() {
    this.getList();
    await this.getAreasList();
    this.initSelect();
  },
};
</script>
