<template>
  <div class="container">
    <h5>Editar Asset</h5>

    <div class="card">
      <div class="card-content">
        <form @submit.prevent="update()">
          <p>Type: <input type="text" v-model="payload.type" required /></p>
          <p>Model: <input type="text" v-model="payload.model" required /></p>
          <p v-if="stateOptions.length > 0">
            State:
            <select v-model="payload.state">
              <option :value="state" v-for="state in stateOptions">{{ state }}</option>
            </select>
          </p>

          <p v-if="areas.length > 0">
            Area:
            <select v-model="payload.areaId">
              <option :value="area.id" v-for="area in areas">{{ area.name }}</option>
            </select>
          </p>
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
  name: 'AssetView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      areas: [],
      payload: {
        type: null,
        model: null,
        state: null,
        areaId: null,
        active: null,
      },
      stateOptions: ['nuevo', 'usado', 'desuso'],
    };
  },
  methods: {
    async getOne() {
      try {
        const { data } = await this.axios({
          method: 'get',
          url: this.api + '/asset/' + this.$route.params.id,
        });

        this.payload = data;
      } catch (error) {
        console.log(error);
      }
    },
    update() {
      if (confirm('Esta seguro de editar?.')) {
        this.axios({
          method: 'patch',
          url: this.api + '/asset/' + this.$route.params.id,
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
    await this.getOne();
    await this.getAreasList();
    this.initSelect();
  },
};
</script>
