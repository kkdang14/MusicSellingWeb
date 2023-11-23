import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: "/",
        name: "home",
        component: () => import('@/views/HomePage.vue'),
        meta: { title: 'Home' },
    },

    {
        path: "/shopping",
        name: "product",
        component: () => import('../views/ProductsPage.vue'),
        meta: { title: 'Shopping' }
    },

    {
        path: "/shopping/:id",
        name: "product-detail",
        component: () => import('../views/ProductDetail.vue'),
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import('../views/NotFound.vue'),
        meta: { title: '404' }
    },

    {
        path: "/manager",
        name: "admin",
        component: () => import('@/views/Admin.vue'),
        meta: { title: 'Admin' },
        beforeEnter: (to, from, next) => {
            // Check if the user is logged in
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert("You must login before access this page")
                next({name: 'login-admin'});
            } else {
                // Check if the user is an admin
                const role = user.role;
                if (role === 'admin') {
                    // Allow access for admin users
                    next()
                } else {
                    alert("Just admin can be access this page")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('user');
                    next('/')
                }
            }
        },
        children: [

            {
                path: "product-management",
                name: "product-management",
                component: () => import("@/components/ProductManagement.vue"),
            },

            {
                path: "add-product",
                name: "add-product",
                component: () => import("@/components/ProductAdd.vue"),
            },

            {
                path: "product-form/:id",
                name: "product-form",
                component: () => import("../components/ProductForm.vue"),
            },

            {
                path: "user-management",
                name: "user-management",
                component: () => import("@/components/UserManagement.vue")
            },

            {
                path: "overall",
                name: "overall",
                component: () => import("@/components/OverallPage.vue")
            },

            {
                path: "order",
                name: "order",
                component: () => import("@/components/OrderPage.vue")
            },
        ]
    },

    {
        path: "/login",
        name: "login",
        component: () => import('../views/LoginPage.vue'),
        meta: { title: 'Login' },
    },

    {
        path: "/login-admin",
        name: "login-admin",
        component: () => import('../views/LoginAdminPage.vue'),
        meta: { title: 'Login Admin' },
    },

    {
        path: "/register",
        name: "register",
        component: () => import('../views/RegisterPage.vue'),
        meta: { title: 'Register' }
    },

    {
        path: "/profile",
        name: "profile",
        component: () => import('../views/Profile.vue'),
        meta: { title: 'Register' }
    },

    {
        path: "/cart",
        name: "cart",
        component: () => import('../views/CartPage.vue'),
        meta: { title: 'Cart' },
        beforeEnter: (to, from, next) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert("You must login before access this page")
                next('/login');
            } else {
                next()
            }
        },
    },

    {
        path: "/favorite",
        name: "favorite",
        component: () => import('../views/FavoritePage.vue'),
        meta: { title: 'Favorite' },
        beforeEnter: (to, from, next) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert("You must login before access this page")
                next('/login');
            } else {
                next()
            }
        },
    }

];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;