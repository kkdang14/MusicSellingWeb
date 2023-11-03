import { createApp } from 'vue'
import router from './routes/route'
import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(router).mount('#app')
