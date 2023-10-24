<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/app/public" class="brand-logo right">AppName</a>
      <ul id="nav-mobile" class="left">
        <li>
          <a class="waves-effect waves-light">
            <i class="material-icons" @click="menu()">menu</i>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/">Inicio</router-link></li>
    <li><router-link to="/about">Nosotros</router-link></li>
    <li><router-link to="/area">Area</router-link></li>
    <li><router-link to="/asset">Assets</router-link></li>
  </ul>
</template>

<script>
import M from 'materialize-css';
export default {
  name: 'menu',
  data() {
    return {
      sidenav: null,
    };
  },
  props: [],
  methods: {
    menu() {
      this.sidenav.open();
    },
  },
  mounted() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    this.sidenav = instances[0];
  },
};
</script>

<style></style>
