<template>
    <div class="product">
        <Searching @search="performSearch"/>
        <div v-if="error">{{ error }}</div>
        <div v-if="loading"><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
        <p v-else-if="products == ''">There are currently no products added to the store</p>
        <p v-else-if="filteredProducts.length === 0">No suitable products were found</p>
        <div class="product-area">
            <product-list :products="filteredProducts"/>
        </div>
    </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import Searching from '../components/Searching.vue';
import ProductService from "../services/products.service";

export default {
    components: { Searching, ProductList },
    data() {
        return {
            products: [], // The complete list of products
            searchText: '', // The search input text
            loading: false,
            error: null,
        };
    },
    created() {
        this.retrieveProduct(); // Fetch data when the component is created
    },
    methods: {
        performSearch(searchText) {
            this.searchText = searchText;
        },

        async retrieveProduct() {
            try {
                this.loading = true;
                this.products = await ProductService.getAllProducts();
            } catch (error) {
                console.error(error);
                this.error = 'An error occurred while fetching products.';
            } finally {
                this.loading = false;
            }
        },

        normalizeText(text) {
            return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        },
    },
    computed: {
        filteredProducts() {
            const searchLower = this.normalizeText(this.searchText).toLowerCase();
            return this.products.filter(product => {
                const productTitleLower = this.normalizeText(product.title).toLowerCase();
                return productTitleLower.includes(searchLower);
            });
        },
    },
};
</script>

<style scoped>
    .product{
        text-align: center;
        background-color: var(--white);
    }
    .product-area{
        /* display: flex;
        justify-content: center; */
        width: 100%;
        background-color: var(--white);
        margin-bottom: 70px;
    }

    .fa-spinner{
        font-size: 40px;
    }
</style>
