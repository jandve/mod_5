import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requireAuth: true,
      verificarRol: true,
      rol: 'admin',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "category" */ '../views/area/index.vue'),
  },
  {
    path: '/area/:id',
    name: 'update-area',
    component: () => import(/* webpackChunkName: "categoryUpdate" */ '../views/area/Update.vue'),
  },
  {
    path: '/asset',
    name: 'asset',
    meta: {
      requireAuth: false,
      verificarRol: true,
      rol: 'admin',
      precondicion: 'asset',
    },
    component: () => import(/* webpackChunkName: "producto" */ '../views/assets/index.vue'),
  },
  {
    path: '/asset/:id',
    name: 'assset',
    component: () => import(/* webpackChunkName: "productUpdate" */ '../views/assets/Update.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (null === localStorage.getItem('auth') || 'false' == localStorage.getItem('auth')) {
      next({ name: 'home' });
    }
  }
  next();
});

export default router;

/**
 * a->b->c
 * x->b
 */
