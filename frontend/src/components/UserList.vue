<template>
    <div class="user-list__admin">
        <h2>USER LIST</h2>
        <div class="container">
            <div v-for="user in users" :key="user._id">
                <div v-if="user.role === 'client'" class="user-item" @click="selectUser(user._id)">
                    <div class="item" >{{ user.firstname }} {{ user.lastname }}</div>
                </div>
            </div>
        </div>
        <div v-if="selectedUserId" class="user-details-popup">
            <div class="popup-content">
                <div>
                    <h3>User Details</h3>
                    <p>Name: {{ getUserDetails(selectedUserId).firstname }} {{ getUserDetails(selectedUserId).lastname }} </p>
                    <p>Email: {{ getUserDetails(selectedUserId).email }}</p>
                    <p>Phone: {{ getUserDetails(selectedUserId).phone }}</p>
                    <p>Address: {{ getUserDetails(selectedUserId).address }}</p>
                    <i class="fa-solid fa-trash" @click="deleteUser(selectedUserId, `${getUserDetails(selectedUserId).firstname} ${getUserDetails(selectedUserId).lastname}`)" ></i>
                </div>
                    <!-- Add more details as needed -->
                <button class="btn-popup" @click="closePopup"><i class="fa-solid fa-close"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/users.service';
export default {
    props: {
        users: Array,
    },

    data() {
        return {
            selectedUserId: null,
        };
    },
    methods: {
        selectUser(userId) {
            this.selectedUserId = userId;
        },
        closePopup() {
            this.selectedUserId = null;
        },
        getUserDetails(userId) {
            // Assuming there is a method to get user details by ID
            return this.users.find(user => user._id === userId) || {};
        },

        async deleteUser(userId, userTitle) {
            if (confirm(`Do you want to remove this product ${userTitle}?`)) {
                try {
                    const response = await UserService.deleteUser(userId)
                    this.users = this.users.filter((user) => user._id !== userId);
                    // this.updateUserCart(productId);
                } catch (error) {
                    console.log(error)
                }
                this.$router.go() 
            }
        },
    },
}
</script>

<style scoped>
    .user-list__admin{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .container {
        display: flex;
        width: 70%;
        flex-wrap: wrap;
        flex-direction: column;
        margin-top: 20px;
        overflow-y: scroll;
        /* Add this line to enable vertical scrollbar */
        max-height: 550px;
    }

    .user-item{
        display: flex;
        justify-content: space-around;
        border: 1px solid var(--black);
        border-radius: 8px;
        align-items: center;
        margin-bottom: 10px;
    }

    .item{
        display: flex;
        justify-content: center;
        font-size: 18px;
        margin: 15px;
        width: 300px;
    }

    .fa-trash{
        font-size: 20px;
    }
    .fa-trash:hover{
        color: var(--black-hover);
        cursor: pointer;
    }
    .user-details-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .popup-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        width: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .btn-popup{
        background-color: transparent;
        height: 40px;
        width: 40px;
        font-size: 20px;
        border-radius: 10px;
    }
    
</style>