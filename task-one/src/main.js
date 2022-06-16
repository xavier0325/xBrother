import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import * as echarts from 'echarts'

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.provide('$http', axios)
app.mount('#app')
