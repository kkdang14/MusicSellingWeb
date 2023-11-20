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
                    <div class="quantity">
                        <div>
                            <button @click="decrementQuantity">-</button>
                            <input v-model="quantity" type="number" min="1" />
                            <button @click="incrementQuantity">+</button>
                        </div>
                    </div>
                    <button class="btn" @click="toggleCart">Add to Cart</button>
                </div>
            </div>
        </div>
        <div class="similar-product">
            <h2>Similar Products</h2>
            <div class="container">
                <div v-for="similarProduct in similarProducts" :key="similarProduct._id" class="favorite-item">
                <!-- Display product details here -->
                    <router-link :to="{ name: 'product-detail', params: { id: similarProduct._id } }" class="item">
                        <img :src="'http://localhost:3000/uploads/' + similarProduct.image" alt="Product Image" />
                        <h2 v-if="similarProduct.category === 'Album'">Album {{ similarProduct.title }}</h2>
                        <h2 v-else>EP {{ similarProduct.title }}</h2>
                        <p>{{ similarProduct.artist }}</p>
                    </router-link>
                    <!-- Add more details as needed -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/products.service';
import UserService from '../services/users.service'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export default {
    data() {
        return {
            product: '',
            isFavorite: false,
            isCart: false,
            quantity: 1,
            similarProducts: [],
        };
    },
    created() {
        this.retrieveProduct();
        this.retrieveProductAll();
    },
    methods: {
        async retrieveProduct() {
            try {
                const productId = this.$route.params.id;
                this.product = await ProductService.getProductById(productId)
                console.log(this.product)
                this.checkFavoriteStatus()
                // this.checkCartStatus()
            } catch (error) {
                console.log(error)
            }
        },

        async retrieveProductAll() {
            try{
                this.similarProducts = await ProductService.getAllProducts()
                console.log(this.similarProducts)
            } catch (error) {
                console.log(error)
            }
        },


        // checkCartStatus() {
        //     // Check if the current product is in the user's favorites
        //     try {
        //         const user = localStorage.getItem('user');
        //         if (user) {
        //             const userData = JSON.parse(user);
        //             this.isCart = userData.cart.includes(this.product._id);
        //         } 
        //     } catch (error) {
        //         console.log(error)
        //     }
        // },

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
                } else {
                    alert("You have to login!")
                    this.$router.push({name: 'login'})
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

        async toggleCart() {
            // Toggle the favorite status
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const userData = JSON.parse(user);

                    // Find the index of the product in the cart
                    const index = userData.cart.findIndex(item => item.productId === this.product._id);

                    if (index !== -1) {
                        // If the product is already in the cart, increase the quantity
                        userData.cart[index].quantity += this.quantity;
                    } else {
                        // If the product is not in the cart, add it with the given quantity
                        userData.cart.push({ productId: this.product._id, quantity: this.quantity });
                    }

                    // Update the user's cart
                    // You need an appropriate API endpoint to handle this update
                    await UserService.updateCart(userData._id, userData.cart);

                    // Update the local storage
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Display a confirmation message
                    // toast.success('Product added to cart', {
                    //     autoClose: 500
                    // });
                    setTimeout(() => {
                        this.$router.go();
                    }, 0);
                }else {
                    alert("You have to login!")
                    this.$router.push({name: 'login'})
                }
            } catch (error) {
                console.log(error);
            }
        },
        

        incrementQuantity() {
            this.quantity += 1;
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity -= 1;
            }
        },
    }
};
</script>

<style scoped>
    .product-detail{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
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
        height: fit-content;
        width: 40%;
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

    .quantity {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .quantity input {
        width: 40px;
        text-align: center;
        margin: 0 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 5px;
    }

    .quantity button {
        background-color: var(--black);
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .quantity button:hover {
        background-color: var(--black-hover)
    }

    .btn:hover{
        background-color: var(--black);
        color: var(--white);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .similar-product{
        background-color: var(--color-bg);
        width: 70%;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;
    }

    .container{
        width: 100%;
        overflow-x: scroll; /* Add this line to enable vertical scrollbar */
        height: 300px;
    }
</style>