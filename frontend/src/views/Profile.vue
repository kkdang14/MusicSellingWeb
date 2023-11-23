<template>
    <div class="profile">
        <div class="container">
            <div class="user-container">
                <div class="avatar">
                    <img class="img" src="../../public/image/avatar.jpg" alt="">
                </div>
                <div class="info">
                    <div class="name">Name: {{ user.firstname }} {{ user.lastname }}</div>
                    <div class="email">Email: {{ user.email }}</div>
                    <div class="phone">Phone: {{ user.phone }}</div>
                    <div class="address">Address: {{ user.address }}</div>
                    <button class="btn-edit" @click="openEditForm">Edit</button>
                    <button class="btn-delete" @click="deleteUser">Delete</button>
                </div>
            </div>
        </div>
        <div v-if="showEditForm" class="edit-form-overlay">
            <div class="edit-form">
                <h2>Edit Your Profile</h2>
                <form class="form" @submit.prevent="saveChanges">
                    <div class="form-item">
                        <label>Firstname</label>
                        <input type="text" id="firstname" placeholder="Firstname" v-model="formData.firstname">
                    </div>
                    <div class="form-item">
                        <label>Lastname</label>
                        <input type="text" id="lastname" placeholder="Lastname" v-model="formData.lastname">
                    </div>
                    <div class="form-item">
                        <label>Email</label>
                        <input type="text" id="eamil" placeholder="Email" v-model="formData.email">
                    </div>
                    <div class="form-item">
                        <label>Phone</label>
                        <input type="text" id="phone" placeholder="Phone" v-model="formData.phone">
                    </div>
                    <div class="form-item">
                        <label>Address</label>
                        <input type="text" id="address" placeholder="Address" v-model="formData.address">
                    </div>
                    <div class="button">
                        <button class="btn-save" type="submit">Save Changes</button>
                        <button class="btn-cancel" @click="closeEditForm">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/users.service';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            user: '',
            showEditForm: false,
            formData: {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                address: ''
            }
        }
    },

    created() {
        this.retrieveUser();
    },

    methods: {
        async retrieveUser() {
            try {
                const user = localStorage.getItem("user");
                if (user) {
                    const userData = JSON.parse(user);
                    this.user = await UserService.getUserById(userData._id)
                    this.formData.firstname = this.user.firstname
                    this.formData.lastname = this.user.lastname
                    this.formData.email = this.user.email
                    this.formData.phone = this.user.phone
                    this.formData.address = this.user.address
                }
            } catch (error) {
                console.error("Error updating quantity on the server:", error);
            }
        },

        openEditForm() {
            this.showEditForm = true;
        },

        closeEditForm() {
            this.showEditForm = false;
        },

        async saveChanges() {
            try {
                const response = await UserService.updateUser(this.user._id, this.formData)
                console.log(response)
                toast.success('Update user profile successfully', {
                    autoClose: 800,
                })
                setTimeout(() => {
                    this.$router.go()
                }, 1200);
            } catch (error) {
                console.error(error)
            }
            this.closeEditForm();
        },

        async deleteUser() {
            try {
                const response = await UserService.deleteUser(this.user._id)
                console.log(response)
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
            } catch (error) {
                console.error(error)
            }
        },
    }
}
</script>


<style scoped>
.profile {
    width: 100%;
}

.container {
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
}

.user-container {
    background-color: var(--color-bg);
    width: 85%;
    margin: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 100px;
}

.avatar .img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid var(--black);
}

.info {
    margin-top: 20px;
    background-color: var(--white);
    width: 100%;
    height: 70%;
    font-size: 20px;
    padding: 50px 50px;
    border-radius: 8px;
}

.name,
.email,
.address,
.phone {
    border: 2px solid var(--black);
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 20px
}

.btn-edit,
.btn-delete {
    border: 2px solid var(--black);
    font-weight: 500;
    background-color: transparent;
    padding: 8px;
    width: 100px;
    margin-right: 20px;
    border-radius: 8px;
}

.btn-edit:hover{
    background-color: var(--black);
    color: var(--white);
}
.btn-delete:hover {
    background-color: var(--favorite);
    color: var(--white);
}

.edit-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.edit-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 35%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.edit-form > h2, .button {
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
}

.form-item {
    margin-bottom: 15px;    
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-save,
.btn-cancel {
    background-color: var(--black);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.btn-save:hover,
.btn-cancel:hover {
    background-color: var(--black-hover);
}

</style>