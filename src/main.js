/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

// import and use View UI(Vue 3 Version)
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

// import Element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

loadFonts()


// import and use "Axios"
import axios from 'axios';
// Vue.prototype.$http = axios;


// Create vue app
const app = createApp(App)


// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(ViewUIPlus)
app.config.globalProperties.$http = axios
app.use(ElementPlus)

// Mount vue app
app.mount('#app')
