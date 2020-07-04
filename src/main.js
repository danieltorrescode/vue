import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

/** Config **/
Vue.prototype.$App = Object.freeze({
    title:   'VUE',
    version: '0.1',
    baseUrl: 'http://localhost:8086/api/',
    debug: true,
    theme:{ 
        headPpal:    'red darkness-3',
        textPpal:    'white--text',
        headForm:    'blue darken-3',
        textForm:    'white--text',
        headList:    'blue darken-3',
        textList:    'white--text',
        headModal:   'blue darken-3',
        textModal:   'white--text'
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
