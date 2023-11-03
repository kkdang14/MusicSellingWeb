<template>
    <div>
        
    </div>
</template>

<script>
import ProductsService from '../services/products.service';

export default {
    data() {
        return {
            productId: null,
            productDetails: null,
        };
    },
    created() {
        this.productId = this.$route.params.id;
    },
    methods: {
        async getProductByID() {
            try {
                this.productDetails = await ProductsService.getProductById(this.productId)
            } catch (error) {
                console.log(error)
            }
        }
    }
};
</script>