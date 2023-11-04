<template>
    <div class="page">
        <nav class="nav">
            <div class="nav-bar">
                <div class="logo">432Hz</div>
                <router-link to="/" class="nav-bar__item">Home</router-link>
                <router-link to="/shopping" class="nav-bar__item">Shopping</router-link>
            </div>
            <div class="other">
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
}

.nav-bar__item {
    margin: 10px;
    font-size: 18px;
    color: #fff;
}


.other {
    display: flex;
    margin-right: 10px;
}

.favorite,
.cart,
.login {
    margin: 10px;
    font-size: 18px;
    color: #fff;
}
</style>