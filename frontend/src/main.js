import { createApp } from 'vue'
import router from './routes/route'
import './style.css'
import './reset.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default Title'; // Set the route's title or a default title
    next();
})  


createApp(App).use(router).mount('#app')
