<template>
    <div class="page">
        <nav class="nav" :class="{ 'transparent-header': isHomePage, 'normal-header': !isHomePage }">
            <div class="nav-bar">
                <router-link to="/" class="logo">432Hz</router-link>
                <router-link to="/" class="nav-bar__item">Home</router-link>
                <router-link to="/shopping" class="nav-bar__item">Shopping</router-link>
            </div>
            <div class="other">
                <router-link to="/favorite" class="favorite">
                    <i class="fa-solid fa-heart"></i>
                </router-link>
                <router-link to="/cart" class="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span v-if="updateCartCount" class="cart-count">({{ countCart }})</span>
                </router-link>
                <template v-if="!isLoggedIn">
                    <router-link to="/login" class="login">Login</router-link>
                </template>
                <template v-else>
                    <div class="profile" @click="togglePopover">
                        <i class="fa-solid fa-circle-user"></i>
                    </div>
                </template>
            </div>
            <user-popover
                v-if="isUserPopoverVisible"
                :show-popover="isUserPopoverVisible"
                :current-user="currentUser"
                @logout="logout"
                @mouseleave="closePopover"
            />
        </nav>
    </div>
</template>

<script>
import UserPopover from '../components/PopupUser.vue';
export default {
    components: {
        UserPopover
    },
    props: {
        isHomePage: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isUserPopoverVisible: false,
            countCart: 0
        }
    },

    created() {
        this.updateCartCount();
    },

    computed: {
        isLoggedIn() {
            // Check if the user is logged in based on the presence of the user data in local storage
            return !!localStorage.getItem('user');
        },
        currentUser() {
            return JSON.parse(localStorage.getItem('user'));
        },

        // cart() {
        //     const user = JSON.parse(localStorage.getItem('user'));
        //     return user ? user.cart : [];
        // },
        //     countCart() {
        //     return this.cart.length
        // },
    },
    methods: {
        togglePopover() {
            this.isUserPopoverVisible = !this.isUserPopoverVisible;
        },
        logout() {
            // Clear local storage when logging out
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.isUserPopoverVisible = false;
            // Redirect to the home page or any desired route after logout
            this.$router.push({name: 'login'});
        },

        updateCartCount() {
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                this.countCart = userData.cart.length;
            } else {
                this.countCart = 0;
        }
        },

        closePopover() {
      // Close the popover
            this.isUserPopoverVisible = !this.isUserPopoverVisible;
        },
    },
};
</script>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-content: center;
    /* background-color: transparent; */
    height: 70px;
    position: sticky;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1001;
}

.transparent-header {
    background-color: transparent;
}

.normal-header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    background-color: var(--black);
    /* position: fixed; */
}

.nav-bar {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-left: 10px;
}

.logo {
    margin: 5px;
    font-size: 26px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
}

.nav-bar__item {
    margin: 10px;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
}

.nav-bar__item:hover {
    color: var(--black-hover);
    cursor: pointer;
}


.other {
    display: flex;
    margin-right: 10px;
}

.favorite,
.cart,
.profile,
.login {
    margin: 10px;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
}

.favorite:hover,
.cart:hover,
.logout:hover,
.login:hover,
.profile:hover {
    color: var(--black-hover);
    font-weight: 600;
}

.cart{
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-count{
    font-size: 18px;
}
</style>