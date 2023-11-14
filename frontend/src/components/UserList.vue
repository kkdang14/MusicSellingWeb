<template>
    <div class="user-list__admin">
        <div class="container">
            <div v-for="user in users" :key="user._id">
                <div v-if="user.role === 'client'" class="user-item">
                    <div class="item" >{{ user.firstname }} {{ user.lastname }}</div>
                    <i class="fa-solid fa-pen" @click="editProduct(user._id)"></i>
                    <i class="fa-solid fa-trash" @click="deleteProduct(user._id)" ></i>
                </div>
                <!-- <div class="product-details">
                    <p>{{ product.desc }}</p>
                </div> -->
            </div>
            <!-- <div class="add-product">
                Add new product
                <router-link :to="{name: 'add-product'}"><button class="btn-add"><i class="fa-solid fa-plus"></i></button></router-link>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        users: Array,
    }
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
    }

    /* .add-product{
        margin-top: 10px;
        padding: 10px;
        border: 1px solid var(--black);
        border-radius: 10px;
        width: 25%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    .btn-add{
        background: transparent;
        width: 40px;
        border-radius: 5px;
    }

    .btn-add:hover{
        background: var(--black);
        color: var(--white);
    } */

    .user-item{
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid var(--black);
        align-items: center;
    }

    .item{
        display: flex;
        /* justify-content: center; */
        font-size: 18px;
        margin: 15px;
        width: 300px;
    }

    .fa-pen:hover,
    .fa-trash:hover{
        color: var(--black-hover);
        cursor: pointer;
    }

    .product-details {
        display: none;
        background-color: white;
        border: 1px solid var(--black);
        padding: 10px;
        z-index: 1;
        width: 300px;
        position: absolute;
        top: 100%; /* Adjust this value to position it below the product */
    }

    .product-item:hover .product-details {
        display: block;
    }
    
</style>