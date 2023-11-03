<!-- RegistrationForm.vue -->
<template>
    <div class="register-page">
        <div class="container">
            <div class="register">Register</div>
            <div class="form">
                <form @submit.prevent="register">
                    <div class="form-item">
                        <label for="username">Name</label><br />
                        <input 
                            class="input" 
                            type="text" 
                            id="username" 
                            placeholder="Enter your username" 
                            v-model="formData.username"
                            />
                    </div>
                    <div class="form-item">
                        <label for="email">Email</label><br />
                        <input 
                            class="input" 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            v-model="formData.email"
                            />
                    </div>
                    <div class="form-item">
                        <label for="password">Password</label><br />
                        <input 
                        class="input" 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        v-model="formData.password"
                        />
                    </div>
                    <button type="submit" class="btn">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "../services/users.service";
export default {
    data() {
        return {
            formData: {
                username: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async register() {
            try {
                // Make a POST request to your backend API
                const response = await UserService.createUser(this.formData);
                console.log(response.data);
                alert("Registration successful");
                this.$router.push({ name: "Login" });
            } catch (error) {
                // Handle registration errors (e.g., show error messages)
                console.error("Registration failed:", error);
            }
        },
    },
};
</script>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.container {
    width: 80%;
    max-width: 400px;
    /* Limit the maximum width to 400px */
    text-align: center;
    padding: 20px;
    margin-top: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register {
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
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}
</style>
