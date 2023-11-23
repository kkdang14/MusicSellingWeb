<template>
    <div class="product-list__admin">
        <div class="search-bar">
            <input v-model="searchText" @keydown.enter="performSearch" placeholder="Search products" />
            <button class="btn" @click="performSearch" type="submit">Search</button>
        </div>
        <div class="container">
            <div class="notify" v-if="filteredProducts.length === 0">No suitable products were found</div>
            <div v-for="product in filteredProducts" :key="product._id">
                <div class="product-item">
                    <div class="img">
                        <img :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image" />
                    </div>
                    <div class="item">{{ product.category }} {{ product.title }} - {{ product.artist }}</div>
                    <i class="fa-solid fa-pen" @click="editProduct(product._id)"></i>
                    <i class="fa-solid fa-trash" @click="deleteProduct(product._id, product.title)"></i>
                </div>
            </div>
        </div>
        <div class="add-product">
            Add new product
            <router-link :to="{ name: 'add-product' }"><button class="btn-add"><i
                        class="fa-solid fa-plus"></i></button></router-link>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/products.service';
import UserService from '../services/users.service';
export default {
    props: {
        products: Array
    },

    data() {
        return {
            searchText: '',
            filteredProducts: []
        };
    },

    watch: {
        products: {
            handler() {
                this.performSearch();
            },
            deep: true
        }
    },

    methods: {
        normalizeText(text) {

            return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        },

        performSearch() {
            const searchLower = this.normalizeText(this.searchText).toLowerCase();
            this.filteredProducts = this.products.filter(product => {
                const productTitleLower = this.normalizeText(product.title).toLowerCase();
                return productTitleLower.includes(searchLower);
            });
        },

        editProduct(product) {
            this.$router.push({ name: "product-form", params: { id: product } });
        },

        async deleteProduct(productId, productTitle) {
            const userConfirmation = await this.showConfirmationDialog(`Do you want to remove this product ${productTitle}?`);
            if (userConfirmation) {
                try {
                    const response = await ProductService.deleteProduct(productId)
                    console.log(response)
                    this.products = this.products.filter((product) => product._id !== productId);
                    this.updateUserCart(productId);
                } catch (error) {
                    console.log(error)
                }
                this.$router.go() 
            }
        },


        async showConfirmationDialog(message) {
            return new Promise((resolve) => {
                // Use a modern dialog or modal library to display a confirmation message
                // For simplicity, you can use the browser's built-in confirm function for now
                const userConfirmation = window.confirm(message);
                resolve(userConfirmation);
            });
        },

        async updateUserCart(productId) {
            const user = localStorage.getItem("user");

            if (user) {
                const userData = JSON.parse(user);

                // Remove the product from the user's cart in localStorage
                userData.cart = userData.cart.filter((item) => item.productId !== productId);
                localStorage.setItem("user", JSON.stringify(userData));

                // Update the user's cart on the server
                try {
                    await UserService.deleteProductCart(userData._id, userData.cart);
                } catch (error) {
                    console.error('Error updating user cart on the server:', error);
                }  
            }
        },

        // toggleProductDetails(productId) {
        // // Toggle the display of product details for the clicked product
        //     this.$set(this.showDetails, productId, !this.showDetails[productId]);
        // },
    }
}
</script>

<style scoped>
.product-list__admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90vh;
    background-color: var(--white);
}

.search-bar {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
}

input {
    padding: 8px;
    width: 40%;
    border: 1px solid var(--black);
    border-radius: 5px;
}

.btn {
    padding: 8px 16px;
    background-color: var(--black);
    color: var(--white);
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: var(--black-hover);
}


.notify {
    text-align: center;
}

.container {
    display: flex;
    width: 70%;
    flex-wrap: nowrap;
    flex-direction: column;
    margin-top: 20px;
    overflow-y: scroll;
    /* Add this line to enable vertical scrollbar */
    max-height: 550px;
    /* Set a maximum height for the container */
}

.add-product {
    padding: 10px;
    border: 1px solid var(--black);
    border-radius: 10px;
    width: 20%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.btn-add {
    background: transparent;
    width: 40px;
    border-radius: 5px;
}

.btn-add:hover {
    background: var(--black);
    color: var(--white);
}

.product-item {
    display: flex;
    justify-content: space-around;
    border: 2px solid var(--black);
    border-radius: 8px;
    align-items: center;
    padding: 10px;
    margin-bottom: 2px;
}

.img {
    height: 90px;
    width: 90px;
}

.item {
    display: flex;
    /* justify-content: center; */
    font-size: 18px;
    margin: 15px;
    width: 300px;
}

.fa-pen,
.fa-trash {
    border: 1px solid var(--black);
    padding: 10px;
    color: var(--white);
    background-color: var(--black);
    width: 80px;
    text-align: center;
    border-radius: 10px;
}

.fa-pen:hover,
.fa-trash:hover {
    color: var(--black-hover);
    cursor: pointer;
}

</style>