import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import "@/assets/styles/main.css";

const Vue = createApp(App);

Vue.config.globalProperties.$App = Object.freeze({
  title: 'Vue.js',
  version: '0.1',
  baseUrl: 'http://localhost:8006/api',
  debug: true,
  theme: {
    headPpal: 'red darkness-3',
    textPpal: 'white--text',
    headForm: 'blue darken-3',
    textForm: 'white--text',
    headList: 'blue darken-3',
    textList: 'white--text',
    headModal: 'blue darken-3',
    textModal: 'white--text',
  },
});

Vue.use(router).mount('#app');
