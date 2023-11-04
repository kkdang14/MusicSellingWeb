import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '../views/ProductsPage.vue';
import HomePage from '../views/HomePage.vue';
import Admin from '../views/Admin.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import ProductDetail from '../views/ProductDetail.vue';
import FavoritePage from '../views/FavoritePage.vue';
import CartPage from '../views/CartPage.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },

    {
        path: "/shopping",
        name: "product",
        component: ProductsPage,
    },

    {
        path: "/shopping/:id",
        name: "product-detail",
        component: ProductDetail
    },

    {
        path: "/admin",
        name: "admin",
        component: Admin,
        children: [
            {
                path: "product-management",
                name: "product-management",
                component: () => import("../components/ProductManagement.vue")
            }
        ]
    },

    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },

    {
        path: "/register",
        name: "register",
        component: RegisterPage,
    },

    {
        path: "/cart",
        name: "cart",
        component: CartPage,
    },

    {
        path: "/favorite",
        name: "favorite",
        component: FavoritePage,
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;