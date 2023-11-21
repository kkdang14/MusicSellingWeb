<template>
    <div class="profile">
        <div class="container">
            <div class="user-container">
                <div class="avatar">
        
                </div>
                <div class="info">
                    <div class="name">Name: </div>
                    <div class="username"></div>
                    <div class="email"></div>
                    <div class="address"></div>
                    <div class="phone"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/users.service';
export default {
    data() {
        return {
            user: ''
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
                    this.user =  await UserService.getUserById(userData._id)
                }
            } catch (error) {
                console.error("Error updating quantity on the server:", error);
            }
        }
    }
}
</script>


<style scoped>
    .profile{
        width: 100%;
    }

    .container{
        width: 100%;
        height: 700px;
        display: flex;
        justify-content: center;
    }

    .user-container{
        background-color: var(--color-bg);
        width: 75%;
        margin: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px 100px;
    }

</style>