<template>
    <div class="product">
        <Searching @search="performSearch"/>
        <p v-if="products == ''">Hiện chưa có sản phẩm nào được thêm vào</p>
        <p v-else-if="filteredProducts.length === 0">Không tìm thấy sản phẩm phù hợp</p>
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
        },

        normalizeText(text) {
        // Normalize text using the 'unorm' library
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    },
    computed: {
        filteredProducts() {
            const searchLower = this.normalizeText(this.searchText).toLowerCase(); // Convert search input to lowercase
            return this.products.filter(product => product.title.includes(searchLower));
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
        margin-bottom: 70px;
    }
</style>
