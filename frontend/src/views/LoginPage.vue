<!-- LoginForm.vue -->
<template>
    <div class="login_page">
        <div class="container">
            <div class="login">Login</div>
            <form @submit.prevent="login" class="form">
                <div class="form-item">
                    <label for="username" class="label">Username</label><br>
                    <input v-model="formData.username" type="text" id="username" placeholder="Username" class="input" />
                </div>
                <div class="form-item">
                    <label for="password" class="label">Password</label><br>
                    <input v-model="formData.password" type="password" id="password" placeholder="Password" class="input" />
                </div>
                <button type="submit" class="btn">Login</button>
                <div class="register">
                    You don't have account?
                    <router-link to="/register">Register</router-link>
                </div>
        </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        login() {
            // Handle login logic and API request here
        },
    },
};
</script>

<style scoped>
.login_page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    width: 80%;
    max-width: 500px;
    height: 400px;
    text-align: center;
    padding: 20px;
    margin-top: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login {
    font-size: 30px;
    margin-bottom: 20px;
}

.form {
    margin-top: 20px;
}

.form-item {
    margin: 10px 0;
    text-align: left;
}

.label {
    font-weight: bold;
}

.input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn {
    margin-top: 20px;
    padding: 10px 20px;
    width: 30%;
    background-color: var(--black);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: var(--black-hover);
    color: var(--white);
}

.register {
    text-align: center;
    margin-top: 10px;
}

.register a {
    text-decoration: none;
    color: #007bff;
}

.register a:hover {
    text-decoration: underline;
}
</style>
