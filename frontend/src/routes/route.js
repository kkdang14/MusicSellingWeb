import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../views/ProductsPage.vue';
import HomePage from '../views/HomePage.vue'
import Admin from '../views/Admin.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ProductDetail from '../views/ProductDetail.vue'

const routes = [
    {
        path: "/",
        component: HomePage,
    },

    {
        path: "/shopping",
        component: ProductsPage,
    },

    {
        path: "/shopping/:id",
        name: "product-detail",
        component: ProductDetail
    },

    {
        path:"/admin",
        name: "Admin",
        component: Admin,
    },

    {
        path: "/login",
        name: "Login",
        component: LoginPage,
    },

    {
        path: "/register",
        name: "register",
        component: RegisterPage,
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;