<template>
    <div class="searching">
        <div class="input-area">
            <input 
                class="input" 
                type="text" 
                placeholder="Searching" 
                @keydown.enter="handleSearch"
                v-model="searchTerm" 
                @input="search">
            <button 
                class="btn" 
                type="submit"
                @click="handleSearch"
            >
                Search
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: '',
        };
    },
    methods: {
        handleSearch() {
            this.$emit('search', this.searchTerm);
        },
    },
};
</script>

<style scoped>
.searching {
    text-align: center;
    margin: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    z-index: 999;
}

.input-area {
    width: 40%;
    border: 2px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
}

input {
    flex: 1;
    outline: none;
    border: none;
    padding: 5px;
    border-radius: 8px;
    /* Add some padding for spacing */
}

.btn {
    outline: none;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    /* Add padding to the button */
    border-radius: 0 8px 8px 0;
    border-left: 2px solid black;
    /* Rounded button corners on the right */
}

.btn:hover {
    background: rgb(49, 47, 47);
    color: #fff;
}

</style>