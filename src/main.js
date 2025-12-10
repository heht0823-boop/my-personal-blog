import { createApp } from 'vue'
import ElementPlus from 'element-plus' // 引入element-plus
import { createPinia } from 'pinia'
import './assets/styles/common.scss' // 引入全局样式

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
