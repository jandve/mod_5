import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    redirect: '/area',
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
