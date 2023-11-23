<!-- RegistrationForm.vue -->
<template>
    <div class="register-page">
        <div class="container">
            <div class="register">Register</div>
            <div>
                <form @submit.prevent="register" class="form">
                    <div class="form-item">
                        <label class="label" for="firstname">Firstname</label><br />
                        <input 
                        class="input" 
                        type="text" 
                        id="firstname" 
                        placeholder="Firstname"
                        :class="{ 'input-error': submitted && (!formData.firstname || usernameError), 'input-success': submitted && !usernameError }"
                        v-model="formData.firstname" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="lastname">Last name</label><br />
                        <input 
                        class="input" 
                        type="text" 
                        id="lastname" 
                        placeholder="Lastname" 
                        :class="{ 'input-error': submitted && (!formData.username || usernameError), 'input-success': submitted && !usernameError }"
                        v-model="formData.lastname" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="username">Username</label><br />
                        <input class="input"
                            :class="{ 'input-error': submitted && (!formData.username || usernameError), 'input-success': submitted && !usernameError }"
                            type="text" id="username" placeholder="Username" v-model="formData.username"
                            @input="validateUsername" />
                        <span class="error-message" v-if="submitted && !formData.username">Username is required</span>
                        <span class="error-message" v-if="submitted && usernameError">{{ usernameError }}</span>
                    </div>

                    <div class="form-item">
                        <label class="label" for="email">Email</label><br />
                        <input class="input"
                            :class="{ 'input-error': submitted && (!formData.email || emailError), 'input-success': submitted && !emailError }"
                            type="text" id="email" placeholder="Email" v-model="formData.email" @input="validateEmail" />
                        <span class="error-message" v-if="submitted && emailError">{{ emailError }}</span>
                        <span class="error-message" v-if="submitted && !formData.email">Email is required</span>
                    </div>

                    <div class="form-item">
                        <label class="label" for="password">Password</label><br />
                        <input class="input"
                            :class="{ 'input-error': submitted && passwordError, 'input-success': submitted && !passwordError }"
                            :type="passwordFieldType" id="password" placeholder="Password" v-model="formData.password"
                            @input="validatePassword" />
                        <i v-if="formData.password" class="icon-eye"
                            :class="[showPassword ? 'fa fa-eye-slash' : 'fa fa-eye']" @click="togglePasswordVisibility"></i>
                        <span class="error-message" v-if="submitted && passwordError">{{ passwordError }}</span>
                    </div>

                    <div class="form-item">
                        <label class="label" for="password2">Confirm Password</label><br />
                        <input class="input"
                            :class="{ 'input-error': submitted && confirmPasswordError, 'input-success': submitted && !confirmPasswordError }"
                            :type="passwordFieldType" id="password2" placeholder="Confirm Password"
                            v-model="formData.password2" @input="validateConfirmPassword" />
                        <span class="error-message" v-if="submitted && confirmPasswordError">{{ confirmPasswordError
                        }}</span>
                    </div>

                    <div class="form-item">
                        <label class="label" for="address">Address</label><br />
                        <input class="input" type="text" id="address" placeholder="Address" v-model="formData.address" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="phone">Phone number</label><br />
                        <input class="input" type="text" id="phone" placeholder="Phone number" v-model="formData.phone" />
                    </div>

                    <div class="login">
                        Bạn đã có tài khoản?
                        <router-link to="/login">Login now!</router-link>
                    </div>

                    <button type="submit" class="btn">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import UserService from "../services/users.service";
export default {
    data() {
        return {
            formData: {
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
                password2: "",
                address: "",
                phone: "",

            },
            usernameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            showPassword: false,
            submitted: false,
        };
    },

    computed: {
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password';
        },
    },

    methods: {
        async register() {
            // this.submitted = true;

            // if (!this.formData.firstname) {
            //     toast.error('Please enter your firstname', {
            //         autoClose: 1000
            //     });
            //     return;
            // }

            // if (!this.formData.lastname) {
            //     toast.error('Please enter your lastname', {
            //         autoClose: 1000
            //     });
            //     return;
            // }

            // if (!this.formData.username) {
            //     toast.error('Please enter a username', {
            //         autoClose: 1000
            //     });
            //     return;
            // }

            // if (!this.formData.email) {
            //     toast.error('Please enter your email', {
            //         autoClose: 1000
            //     });
            //     return;
            // }

            // if (this.usernameError || this.emailError || this.passwordError || this.confirmPasswordError) {
            //     return;
            // }

            // if (this.formData.password !== this.formData.confirmPassword) {
            //     this.confirmPasswordError = "Passwords do not match";
            //     return;
            // }
            try {
                const response = await UserService.createUser(this.formData);
                console.log(response);
                toast.success('Registration successful', {
                    autoClose: 1500,
                })
                setTimeout(() => {
                    this.$router.push({ name: "login" });
                }, 800);
            } catch (error) {
                console.error("Registration failed:", error);
            }
        },

        validateUsername() {
            if (this.formData.username.length < 3) {
                this.usernameError = "Username must be at least 3 characters long";
            } else {
                this.usernameError = "";
            }
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.formData.email)) {
                this.emailError = "Invalid email format";
            } else {
                this.emailError = "";
            }
        },

        // validatePassword() {
        //     if (this.formData.password.length < 8) {
        //         this.passwordError = "Password must be at least 8 characters long";
        //     } else {
        //         this.passwordError = "";
        //     }
        // },

        // validateConfirmPassword() {
        //     if (this.formData.password2.length < 8) {
        //         this.confirmPasswordError = "Password must be at least 8 characters long";
        //     }
        //     else if (this.formData.password2 !== this.formData.password) {
        //         this.confirmPasswordError = "Passwords do not match";
        //     } else {
        //         this.confirmPasswordError = "";
        //     }
        // },

        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    width: 80%;
    width: 800px;
    height: 600px;
    text-align: center;
    padding: 20px;
    margin-top: 10px;
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /* Allow items to wrap to the next row */
    justify-content: space-between;
}

.form-item {
    box-sizing: border-box;
    padding: 10px;
    width: 48%;
    /* Set width to 48% to fit two items in one row with a small gap */
    margin-bottom: 10px;
    /* Add some space between form items */
    text-align: left;
}

.label {
    font-weight: bold;
    font-size: 18px;
}

.input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* .input {
    width: 100%;
    box-sizing: border-box;
} */

.btn {
    /* margin-top: 20px; 
    margin-left: auto; 
    margin-right: 30; */
    margin: 20px 60px auto auto;
    padding: 10px 20px;
    width: 30%;
    /* Adjust the width as needed */
    background-color: var(--black);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: var(--black-hover);
    color: var(--white)
}

.input-error {
    border-color: red;
}


.input-success {
    border-color: green;
}

.error-message {
    color: red;
    /* Set the text color to red */
    font-size: 14px;
    /* Define the font size */
    margin-top: 5px;
    /* Add some spacing to separate error messages */
    text-align: left;
    /* Align text to the left */
}

.icon-eye {
    position: relative;
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
    margin-left: -30px;
}

.login {
    text-align: center;
    margin-top: 10px;
}

.login a {
    text-decoration: none;
    color: #007bff;
}

.login a:hover {
    text-decoration: underline;
}
</style>
