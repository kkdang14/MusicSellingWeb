<template>
    <div class="product-list">
        <div class="category">Album</div>
        <div class="product-list__category">
            <div class="container">
                <div v-for="product in products" :key="product._id">
                    <div class="item" v-if="product.category === 'Album'">
                        <div class="img">
                            <img :src="product.image" alt="Product Image" />
                        </div>
                        <div class="details">
                            <div class="name">{{ product.name }}</div>
                            <div class="price">$ {{ product.price }}</div>
                            <button class="add-to-cart">Add to Cart</button>
                            <button class="buy-now">Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="category">EP</div>
        <div class="product-list__category">
            <div class="container">
                <div v-for="product in products" :key="product._id">
                    <div class="item" v-if="product.category === 'EP'">
                        <div class="img">
                            <img :src="product.image" alt="Product Image" />
                        </div>
                        <div class="details">
                            <div class="name">{{ product.name }}</div>
                            <div class="price">$ {{ product.price }}</div>
                            <button class="add-to-cart">Add to Cart</button>
                            <button class="buy-now">Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        products: Array, // Prop to receive the list of products from the parent component
    },
};
</script>

<style scoped>
.category {
    margin-top: 20px;
    background-color: var(--color-bg);
    border-radius: 10px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: 500;
    font-size: 25px;
}

.product-list__category {
    display: flex;
    background-color: var(--color-bg);
    border-radius: 10px;
    margin: 20px 5px;
    padding: 10px;
    width: calc(100% - 10px);
}

.container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.item {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 20px;
    height: 275px;
    width: 225px;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;
}

.item:hover {
    transform: scale(1.05);
}

.img {
    width: 100%;
    height: 100%;
    border: 2px solid black;
}

.img img {
    width: 100%;
    height: 200px;
    object-fit: contain;
}

.details {
    margin-top: auto;
}

.name {
    font-weight: bold;
    font-size: 1.2rem;
}

.price {
    font-size: 1rem;
}

.add-to-cart,
.buy-now {
    background-color: #000;
    color: #fff;
    border: none;
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-to-cart:hover,
.buy-now:hover {
    background-color: rgb(71, 69, 69);
}
</style>