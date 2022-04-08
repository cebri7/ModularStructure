import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import UserModule from '@/modules/users'
import { registerModules } from './register-store'

registerModules({
    UserModule: UserModule
});

axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.withCredentials = true

createApp(App).use(store).use(router).mount('#app')
