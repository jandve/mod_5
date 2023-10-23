import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requireAuth: true,
      verificarRol: true,
      rol: 'admin'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
  },
  {
    path: '/category/:id',
    name: 'categoryUpdate',
    component: () => import(/* webpackChunkName: "categoryUpdate" */ '../views/CategoryUpdate.vue')
  },
  {
    path: '/producto',
    name: 'producto',
    meta: {
      requireAuth: false,
      verificarRol: true,
      rol: 'admin',
      precondicion:"category"
    },
    component: () => import(/* webpackChunkName: "producto" */ '../views/Product.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "productUpdate" */ '../views/Product.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some((record) => record.meta.requireAuth)){
    if(null === localStorage.getItem('auth') || 'false' == localStorage.getItem('auth')){
      next({name: "home"});
    }
  }
  next();
});

export default router

/**
 * a->b->c
 * x->b
 */