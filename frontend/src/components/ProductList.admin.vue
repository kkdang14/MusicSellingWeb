<template>
    <div class="product-list__admin">
        <div class="container">
            <div v-for="product in products" :key="product._id">
                <div class="product-item" @click="toggleProductDetails(product._id)">
                    <div class="img">
                        <img :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image" />
                    </div>
                    <div class="item">{{ product.category }} {{ product.title }} - {{ product.artist }}</div>
                    <i class="fa-solid fa-pen" @click="editProduct(product._id)"></i>
                    <i class="fa-solid fa-trash" @click="deleteProduct(product._id, product.title)" ></i>
                </div>
                <div v-if="showDetails[product._id]" class="product-details">
                    <p>{{ product.desc }}</p>
                </div>
            </div>
        </div>
        <div class="add-product">
            Add new product
            <router-link :to="{name: 'add-product'}"><button class="btn-add"><i class="fa-solid fa-plus"></i></button></router-link>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/products.service';
export default {
    props: {
        products: Array
    },

    data() {
        return {
            showDetails: {},
        };
    },

    methods: {
        editProduct(product) {
            this.$router.push({ name: "product-form", params: { id: product} });
        },

        async deleteProduct(productId, producTitle) {
            if (confirm(`Do you want to remove this product ${producTitle}`)) {
                try {   
                    const response = await ProductService.deleteProduct(productId)
                    console.log(response)
                    this.products = this.products.filter((product) => {
                        if (product._id !== productId) {
                            return product._id;
                        }
                    });
                } catch (error) {
                    console.log(error)
                }
            } else {
                return false; // Prevent page reload
            }
        },

        toggleProductDetails(productId) {
        // Toggle the display of product details for the clicked product
            this.$set(this.showDetails, productId, !this.showDetails[productId]);
        },
    }
}
</script>

<style scoped>
    .product-list__admin{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 90vh;
        background-color: var(--white);
    }

    .container {
        display: flex;
        width: 70%;
        flex-wrap: nowrap;
        flex-direction: column;
        margin-top: 20px;
        overflow-y: scroll; /* Add this line to enable vertical scrollbar */
        max-height: 550px; /* Set a maximum height for the container */
    }

    .add-product{
        margin-top: 20px;
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
    }

    .product-item{
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid var(--black);
        align-items: center;
        padding: 10px;
    }

    .img{
        height: 90px;
        width: 90px;
    }

    .item{
        display: flex;
        /* justify-content: center; */
        font-size: 18px;
        margin: 15px;
        width: 300px;
    }

    .fa-pen,
    .fa-trash{
        border: 1px solid var(--black);
        padding: 10px;
        color: var(--white);
        background-color: var(--black);
        width: 80px;
        text-align: center;
        border-radius: 10px;
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