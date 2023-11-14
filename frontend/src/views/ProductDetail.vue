<template>
    <div class="product-detail">
        <div class="product-info">
            <img src="/image/tlinh.png" alt="Product Image"  class="img"/>
            <div class="details">
                <h1 v-if ="product.category === 'Album'"> Album {{ product.title }}</h1>
                <h1 v-if ="product.category === 'EP'">EP {{ product.title }}</h1>
                <p>{{ product.desc }}</p>
                <p>Price: ${{ product.price }}</p>
                <button @click="addToCart">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProductsService from '../services/products.service';

export default {
    data() {
        return {
            product: '',
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
            } catch (error) {
                console.log(error)
            }
        }
    }
};
</script>

<style scoped>
    .product-detail{
        display: flex;
        justify-content: center;
        background: var(--white);
    }

    .product-info{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 70%;
        height: 500px;
    }

    .img{
        height: 70%;
        border: 1px solid #000;
        margin: 10px;
    }

    .details{
        margin: 10px;
    }


</style>