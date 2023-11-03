<template>
    <div class="product">
        <Searching />
        <p v-if="products == ''">Hiện chưa có sản phẩm nào được thêm vào</p>
        <div class="product-area">
            <product-list :products="products"/>
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
        };
    },
    created() {
        this.retrieveProduct(); // Fetch data when the component is created
    },
    methods: {
        performSearch(searchText) {
            this.searchText = searchText;
        },

        async retrieveProduct(){
            try {
                this.products = await ProductService.getAllProducts();
            } catch (error) {
                console.log(error);
            }
        }   
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => product.name.includes(this.searchText));
        },
    },
};
</script>

<style scoped>
    .product{
        text-align: center;
    }
    .product-area{
        /* display: flex;
        justify-content: center; */
        width: 100%;
        background-color: #fff; 
    }
</style>
