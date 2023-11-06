<template>
    <div class="page">
        <div class="productlist-area">
            <product-list-admin :products="products"></product-list-admin>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/products.service';
import ProductListAdmin from '../components/ProductList.admin.vue';
export default {
    components: { ProductListAdmin },

    data() {
        return{
            products: [],
        }
    },

    methods: {
        async retrieveProduct(){
            try {
                this.products = await ProductService.getAllProducts();
                console.log('Products retrieved:', this.products);
            } catch (error) {
                console.log(error);
            }
        },

        // show() {
        //     console.log(this.products)
        // }
    },

    // computed: {
    //     filteredProducts() {
    //         return this.products;
    //     },
    // },
}
</script>


<style scoped>
    .page{
        width: 100%;
        height: auto;
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

</style>