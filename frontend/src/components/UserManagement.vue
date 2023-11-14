<template>
    <div class="page">
        <div class="container">
            <user-list :users="users"></user-list>
        </div>
    </div>
</template>
<script>
import UserList from '../components/UserList.vue';
import usersService from '../services/users.service';

export default {
    components: { UserList },

    data() {
        return {
            users: [],
        }
    },

    created() {
        this.retrieveUser();
    },

    methods:{
        async retrieveUser() {
            try {
                this.users = await usersService.getAllUsers()
                console.log('Users retrieved:', this.users);
            } catch (error) {
                console.error('Error retrieving users:', error);
            }
        }   
    }
}
</script>

<style scoped>
    .page{
        width: 100%;
        height: auto;
    }

    /* .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    } */

</style>