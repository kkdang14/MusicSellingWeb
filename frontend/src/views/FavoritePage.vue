<template>
    <div class="favorites">
        <h1>My Favorite Products</h1>
        <div v-if="products.length === 0">You have no favorite products.</div>
        <div class="container" v-else>
            <div v-for="product in products" :key="product._id" class="favorite-item">
                <!-- Display product details here -->
                <router-link :to="{ name: 'product-detail', params: { id: product._id } }" class="item">
                    <img :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image" />
                    <h2 v-if="product.category === 'Album'">Album {{ product.title }}</h2>
                    <h2 v-else>EP {{ product.title }}</h2>
                    <p>{{ product.artist }}</p>
                </router-link>
                <!-- Add more details as needed -->
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "../services/users.service";
import ProductsService from "../services/products.service";
export default {
    data() {
        return {
            products: [],
        };
    },
    created() {
        this.retrieveFavorites();
    },
    methods: {
        async retrieveFavorites() {
            try {
                const user = localStorage.getItem("user");
                if (user) {
                    const userData = JSON.parse(user);
                    const favoriteProductIds = userData.favorite; // Assuming these are product IDs
                    const favoriteProducts = await Promise.all(
                        favoriteProductIds.map(async (productId) => {
                            return await ProductsService.getProductById(productId);
                        })
                    );
                    console.log(this.products);
                    this.products = favoriteProducts.filter(Boolean);
                }
            } catch (error) {
                console.error("Error retrieving favorites:", error);
            }
        },
    },
};
</script>

<style scoped>
.favorites {
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container{
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}

.favorite-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 20%;
    padding: 20px;
    margin: 30px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
}

.favorite-item:hover {
    transform: translateY(-10px);
}

.item{
    width: 100%;
    text-decoration: none;
}

img {
    max-width: 100%;
    border-radius: 8px;
}

h2 {
    font-size: 1.5rem;
    margin: 10px 0;
    color: var(--black);
}

p {
    color: #777;
}


/* Add more styles as needed */
</style>
