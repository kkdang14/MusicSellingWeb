<template>
    <div class="product-list__admin">
        <div class="container">
            <div v-for="product in products" :key="product._id">
                <!-- <div class="img">
                    <img :src="product.image" alt="Product Image" />
                </div>
                <div class="name">{{ product.name }}</div> -->
                {{ product.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        products: Array
    }        
}
</script>

<style scoped>
    .product-list__admin{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .container {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
    }
</style>