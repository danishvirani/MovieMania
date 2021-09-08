import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  VueGoogleMaps from '@fawmi/vue-google-maps'// eslint-disable-line

import '@/assets/styles/app.css'

createApp(App).use(store).use(router).use(VueGoogleMaps, { load: { key: process.env.VUE_APP_GOOGLE_KEY, libraries: 'places' } }).mount('#app')
