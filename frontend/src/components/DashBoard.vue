<template>
    <div class="admin-dashboard">
        <div class="vertical-menu">
            <router-link to="/dashboard/overall" class="menu-item">
                <i class="fa-solid fa-chart-simple"></i><br>
                Overview
            </router-link>
            <router-link to="/dashboard/user-management" class="menu-item">
                <i class="fa-solid fa-user"></i><br>
                User
            </router-link>
            <router-link to="/dashboard/product-management" class="menu-item">
                <i class="fa-solid fa-box"></i><br>
                Product
            </router-link>
            <router-link to="/dashboard/order" class="menu-item">
                <i class="fa-solid fa-dolly"></i><br>
                Order
            </router-link>
            <router-link to="/" class="menu-item">
                <i class="fa-solid fa-right-from-bracket"></i>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>

.admin-dashboard{
    display: flex;
    width: 100%;
    height: auto;
}
.vertical-menu {
    background-color: #333;
    width: 100px;
    height: 100vh;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.menu-item {
    display: block;
    color: #fff;
    text-decoration: none;
    margin-bottom: 80px;
    margin-top: 30px;
    padding: 10px 0;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s;
}

.menu-item i{
    font-size: 25px;
}

.menu-item:hover {
    background-color: #444;
}
</style>
