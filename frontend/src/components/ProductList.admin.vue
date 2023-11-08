<template>
    <div class="product-list__admin">
        <div class="container">
            <div class="add-product">
                Add new product
                <router-link :to="{name: 'add-product'}"><button class="btn-add"><i class="fa-solid fa-plus"></i></button></router-link>
            </div>
            <div v-for="product in products" :key="product._id">
                <div class="product-item">
                    <div class="img">
                        <img :src="product.img" alt="Product Image" />
                    </div>
                    <div class="item">{{ product.category }} - {{ product.title }} - {{ product.artist }}</div>
                    <i class="fa-solid fa-pen" @click="editProduct(product._id)"></i>
                    <i class="fa-solid fa-trash" @click="deleteProduct(product._id)" ></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/products.service';
export default {
    props: {
        products: Array
    },

    methods: {
        editProduct(product) {
            this.$router.push({ name: 'product-form', params: { id: product._id } });
        },

        reload() {
            window.location.reload();    
        },

        async deleteProduct(productId) {
            if (confirm("Do you want to remove this product")) {
                try {
                    const response = await ProductService.deleteProduct(productId)
                    console.log(response.data)
                    this.products = this.products.filter(product => product._id !== productId);
                } catch (error) {
                    console.log(error)
                }
            } else {
                return false; // Prevent page reload
            }
        }
    }
}
</script>

<style scoped>
    .product-list__admin{
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

    .add-product{
        padding: 10px;
        border: 1px solid var(--black);
        width: 25%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    .btn-add{
        background: transparent;
        width: 40px;
        border-radius: 5px  ;
    }

    .btn-add:hover{
        background: var(--black);
        color: var(--white);
    }

    .product-item{
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid var(--black);
        align-items: center;
    }

    .item{
        display: flex;
        justify-content: center;
        font-size: 18px;
        margin: 15px;
        width: 300px;
    }

    .fa-pen:hover,
    .fa-trash:hover{
        color: var(--black-hover);
        cursor: pointer;
    }
    
</style>