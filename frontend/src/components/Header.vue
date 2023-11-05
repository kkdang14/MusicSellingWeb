<template>
    <div class="page">
        <nav class="nav">
            <div class="nav-bar">
                <router-link to="/" class="logo">432Hz</router-link>
                <router-link to="/" class="nav-bar__item">Home</router-link>
                <router-link to="/shopping" class="nav-bar__item">Shopping</router-link>
            </div>
            <div class="other">
                <router-link to="/admin" class="admin">
                    <i class="fa-solid fa-user-gear"></i>
                </router-link>
                <router-link to="/favorite" class="favorite">
                    <i class="fa-solid fa-heart"></i>
                </router-link>
                <router-link to="/cart" class="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                </router-link>
                <router-link to="/login" class="login">Login</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    
};
</script>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    background-color: rgb(30, 30, 30);
}

.nav-bar {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-left: 10px;
}

.logo {
    margin: 5px;
    font-size: 25px;
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

.nav-bar__item:hover{
    color: var(--black-hover);
}


.other {
    display: flex;
    margin-right: 10px;
}

.favorite,
.cart,
.admin,
.login {
    margin: 10px;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
}

.favorite:hover,
.cart:hover,
.admin:hover,
.login:hover {
    color: var(--black-hover)
}
</style>