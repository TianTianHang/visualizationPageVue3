import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
import 'element-plus/es/components/message/style/css'
import {setupStore} from './stores/store'
import {router} from "@/router";

const app = createApp(App)
setupStore(app)
app.use(router)
app.mount('#app')
