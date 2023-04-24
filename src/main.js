import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
import 'element-plus/es/components/message/style/css'
import {setupStore} from './stores/store'

const app = createApp(App)

setupStore(app)
app.mount('#app')
