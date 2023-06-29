import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import cognito from './plugins/cognito'

const app = createApp(App)

app.use(router)

app.use(cognito)

app.mount('#app')
