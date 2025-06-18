import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './permission'
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate) // 在 app.use(pinia) 前调用
app.use(pinia)
app.use(router)
// axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.baseURL = '/api'
// 注册Element Plus及其图标
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(axios)
app.mount('#app')