<template>
    <div class="cart">
        <div class="check-in">
            <h1>CART</h1>
            <div class="title">
                <div class="check-all">
                    <input class="checkbox" type="checkbox" name="" id="" />
                </div>
                <div class="product">Product</div>
                <div class="unit-price">Unit price</div>
                <div class="amount">Quantity</div>
                <div class="money">Final Price</div>
                <div class="del">Delete</div>
            </div>
            <div v-if="products.length === 0">You have no product in cart.</div>
            <div class="container">
                <div v-for="product in products" :key="product._id" class="cart-item">
                    <div class="item">
                        <div class="check-product">
                            <input class="checkbox" type="checkbox" name="" id=""  v-model="product.selected" />
                        </div>
                        <img class="img" :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image" />
                        <div class="info">
                            {{ product.category }} {{ product.title }}
                        </div>
                        <div class="price">${{ product.price }}</div>
                        <div class="quantity">
                            <div>
                                <button @click="decrementQuantity(product)">-</button>
                                <input v-model="product.quantity" type="number" min="1" />
                                <button @click="incrementQuantity(product)">+</button>
                            </div>
                        </div>
                        <div class="sum-money">${{ calculatePrice(product) }}</div>
                        <i class="fa-solid fa-trash" @click="deleteProduct(product._id, product.title)"></i>
                    </div>
                </div>
            </div>
        </div>
        <check-out :selectedProducts="selectedProducts" @checkout="proceedToCheckout"></check-out>
    </div>
</template>

<script>
import UserService from "../services/users.service";
import ProductService from "../services/products.service";
import CheckOut from "../components/CheckOut.vue"
export default {
    components: {
        CheckOut  
    },
    data() {
        return {
            products: [],
            isCheck: false,
        };
    },
    created() {
        this.retrieveCart();
    },

    computed: {
        selectedProducts() {
        // Filter selected products
        return this.products.filter((product) => product.selected);
        },
    },

    methods: {
        async retrieveCart() {
            try {
                const user = localStorage.getItem("user");
                if (user) {
                    const userData = JSON.parse(user);
                    const cartProducts = await this.fetchCartProducts(userData.cart);
                    this.products = cartProducts.filter(Boolean);
                }
            } catch (error) {
                console.error("Error retrieving cart:", error);
            }
        },
        async fetchCartProducts(cart) {
            return await Promise.all(
                cart.map(async (item) => {
                    const product = await ProductService.getProductById(item.productId);
                    if (product) {
                        product.quantity = item.quantity;
                    }
                    return product;
                })
            );
        },
        getQuantity(productId) {
            const user = localStorage.getItem("user");
            if (user) {
                const userData = JSON.parse(user);
                const cartItem = userData.cart.find((item) => item.productId === productId);
                return cartItem ? cartItem.quantity : 0;
            }
            return 0;
        },

        async incrementQuantity(product) {
            product.quantity += 1;
            await this.updateServerQuantity(product)
        },
        async decrementQuantity(product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
            }
            await this.updateServerQuantity(product)
        },

        async updateServerQuantity(product) {
            try {
                const user = localStorage.getItem("user");
                if (user) {
                    const userData = JSON.parse(user);
                    const cartItem = userData.cart.find((item) => item.productId === product._id);
                    if (cartItem) {
                        // Update the quantity on the server
                        // Update the local storage
                        cartItem.quantity = product.quantity;

                        await UserService.updateCart(userData._id , userData.cart);
                        localStorage.setItem("user", JSON.stringify(userData));
                    }
                }
            } catch (error) {
                console.error("Error updating quantity on the server:", error);
            }
        },

        async deleteProduct(productId, producTitle) {
            if (confirm(`Do you want to remove this product ${producTitle}`)) {
                try {
                    const user = localStorage.getItem("user");
                    if (user) {
                        const userData = JSON.parse(user);
                        userData.cart = userData.cart.filter((item) => item.productId !== productId);
                        localStorage.setItem("user", JSON.stringify(userData));

                        this.products = this.products.filter((product) => product._id !== productId);
                        await UserService.deleteProductCart(userData._id, userData.cart);
                    }
                } catch (error) {
                    console.error(error);
                }
                this.$router.go()
            } else {
                return false; 
            }
        }, 
        calculatePrice(product) {
            return (product.price * product.quantity).toFixed(2)
        },

        async proceedToCheckout() {
      // Filter selected products
            const selectedProducts = this.products.filter(product => product.selected);
            this.$emit('cart-updated', selectedProducts);
        },
    },
};
</script>

<style scoped>

.cart {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 50px;
    height: 630px;
}

.title {
    display: flex;
    /* border: 2px solid var(--black); */
    width: 100%;
    align-items: center;
    font-weight: 500;
    padding: 8px;
    margin-bottom: 2px;
    border-radius: 8px;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
}

.check-all {
    margin-left: 38px;
}

.product {
    margin-left: 50px;
}

.unit-price {
    margin-left: 350px;
}

.amount {
    margin-left: 70px;
}

.money {
    margin-left: 60px;
}

.del {
    margin-left: 35px;
}
.container {
    display: flex;
    width: 1000px;
    flex-wrap: nowrap;
    flex-direction: column;
    margin-top: 20px;
    overflow-y: scroll;
    max-height: 500px;
}

.item {
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid var(--black);
    align-items: center;
    padding: 10px;
    margin-bottom: 2px;
    /* border-radius: 8px; */
}

.img {
    height: 90px;
    width: 90px;
}

.info {
    display: flex;
    font-size: 18px;
    margin: 15px;
    width: 200px;
}

.price{
    width: 50px;
}

.sum-money{
    width: 50px;
}

.quantity {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    width: 100px;
}

.quantity input {
    width: 30px;
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
    width: 30px;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.quantity button:hover {
    background-color: var(--black-hover);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.fa-trash{
    border: 1px solid var(--black);
    padding: 10px;
    color: var(--white);
    background-color: var(--black);
    width: 40px;
    text-align: center;
    border-radius: 10px;
    }

.checkbox {
    width: 16px;
    height: 16px;
    background-color: #fff;
}

.checkbox:checked {
    accent-color: var(--black);
}

</style>
