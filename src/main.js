import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import VueTheMask from 'vue-the-mask'

createApp(App).use(VueAxios, axios).use(ElementPlus).use(VueTheMask).mount('#app')