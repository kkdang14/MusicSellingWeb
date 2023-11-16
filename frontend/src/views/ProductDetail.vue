<template>
    <div class="product-detail">
        <div class="product-info">
            <img :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image"  class="img"/>
            <div class="details">
                <h2 v-if ="product.category === 'Album'"> Album {{ product.title }}</h2>
                <h2 v-if ="product.category === 'EP'">EP {{ product.title }}</h2>
                <h4>{{ product.artist }}</h4>
                <div class="price">${{ product.price }}</div>
                <div class="desc">{{ product.desc }}</div>
                <div class="favorite">
                    <i 
                        @click="toggleFavorite" 
                        :class="isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                    ></i>
                </div>
                <div class="add-to-cart">
                    <div class="quantity">Quantity</div>
                    <button class="btn" @click="addToCart">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductsService from '../services/products.service';
import UserService from '../services/users.service'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            product: '',
            isFavorite: false,
        };
    },
    created() {
        this.retrieveProduct();
    },
    methods: {
        async retrieveProduct() {
            try {
                const productId = this.$route.params.id;
                this.product = await ProductsService.getProductById(productId)
                console.log(this.product)
                this.checkFavoriteStatus()
            } catch (error) {
                console.log(error)
            }
        },

        checkFavoriteStatus() {
            // Check if the current product is in the user's favorites
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const userData = JSON.parse(user);
                    this.isFavorite = userData.favorite.includes(this.product._id);
                } 
            } catch (error) {
                console.log(error)
            }
        },

        async toggleFavorite() {
            // Toggle the favorite status
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const userData = JSON.parse(user);

                    // If the product is already in favorites, remove it; otherwise, add it
                    const index = userData.favorite.indexOf(this.product._id);
                    if (index !== -1) {
                        userData.favorite.splice(index, 1);
                    } else {
                        userData.favorite.push(this.product._id);
                    }

                    // Update the user's favorites
                    // You need an appropriate API endpoint to handle this update
                    await UserService.updateFavorite(userData._id, userData.favorite);

                    // Update the local storage
                    localStorage.setItem('user', JSON.stringify(userData));
                    // Update the component's isFavorite state
                    this.isFavorite = !this.isFavorite;
                }
                if (this.isFavorite === true) {
                    toast.success('A product has been added to favorite', {
                        autoClose: 800
                    })
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
};
</script>

<style scoped>
    .product-detail{
        display: flex;
        justify-content: center;
    }

    .product-info{
        margin: 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 70%;
        height: 500px;
        background-color: var(--color-bg);
        border-radius: 8px;
    }

    .img{
        height: 70%;
        border: 1px solid #000;
        border-radius: 8px;
        padding: 10px;
    }

    .details{
        width: 50%;
        height: auto;
    }

    .price{
        font-size: 24px;
        font-weight: 500;
    }

    .fa-heart{
        font-size: 30px;
        cursor: pointer;
    }

    .fa-solid{
        color: var(--favorite);
    }

    .btn{
        border: 2px solid var(--black);
        font-weight: 500;
    }

    .btn:hover{
        background-color: var(--black);
        color: var(--white);
    }
</style>