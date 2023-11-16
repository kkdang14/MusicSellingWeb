<!-- UserPopover.vue -->
<template>
    <div class="user-popover" v-show="showPopover" @click.stop>
        <div class="avatar">
            <!-- <i class="fa-solid fa-circle-user"></i>  -->
            Hello, {{ currentUser.username }}
        </div>
        <div class="popover-content">
            <router-link to="/profile" class="profile">Profile</router-link>
            <router-link to="/favorite" class="favorite">Favorite</router-link>
            <div class="setting">Setting</div>
            <div @click="logout" class="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showPopover: Boolean,
        currentUser: Object,
    },

    watch: {
        showPopover(newValue) {
            if (newValue) {
                // Add a click event listener to the document when the popover is shown
                document.addEventListener('click', this.closePopover);
            } else {
                // Remove the click event listener when the popover is hidden
                document.removeEventListener('click', this.closePopover);
            }
        },
    },

    methods: {
        logout() {
            this.$emit('logout');
        },
    },

    // mounted() {
    // // Add a click event listener to the document
    //     document.addEventListener('click', this.closePopover);
    // },
    // beforeDestroy() {
    //     // Remove the click event listener when the component is destroyed
    //     document.removeEventListener('click', this.closePopover);
    // },
};
</script>

<style scoped>
/* Add your styling for the popover */
.user-popover {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    /* Position it below the user icon */
    right: 35px;
    width: 200px;
    top: 60px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    cursor: default;
    /* Prevents the click event from propagating to the document */
}

.popover-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: start;
}

.popover-content > :nth-child(n){
    border-bottom: 1px solid var(--black) !important;
    margin-bottom: 10px;
    background: transparent;
    padding: 8px;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    color: var(--black);
    border: none;
    text-decoration: none;
}

.popover-content :nth-child(n):hover{
    background-color: var(--gray-hover);
}
</style>
