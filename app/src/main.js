import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.min.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/styles.scss'

axios.interceptors.request.use(
    (config)=>{

        config.headers['Authorization'] = 'Bearer '+localStorage.getItem("token");
        return config;
    }, 
    (error) =>{
        Promise.reject(error);
    }
)

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
