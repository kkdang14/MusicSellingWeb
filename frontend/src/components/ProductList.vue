<template>
    <div class="product-list">
        <div class="category">Album</div>
        <div class="product-list__category">
            <div class="container">
                <div v-for="product in products" :key="product._id">
                    <router-link :to="{ name: 'product-detail', params: { id: product._id } }" class="item" v-if="product.category === 'Album'">
                        <div class="img">
                            <img :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image" />
                        </div>
                        <div class="details">
                            <div class="name">{{ product.title }}</div>
                            <div class="price">$ {{ product.price }}</div>
                            <button class="add-to-cart">Add to Cart</button>
                            <!-- <router-link class="buy-now" :to="{ name: 'product-detail', params: { id: product._id } }">Buy now</router-link> -->
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="category">EP</div>
        <div class="product-list__category">
            <div class="container">
                <div v-for="product in products" :key="product._id">
                    <div class="item" v-if="product.category === 'EP'">
                        <router-link :to="{ name: 'product-detail', params: { id: product._id } }" class="img">
                            <img :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image" />
                        </router-link>
                        <div class="details">
                            <div class="name">{{ product.title }}</div>
                            <div class="price">$ {{ product.price }}</div>
                            <button class="add-to-cart">Add to Cart</button>
                            <!-- <router-link class="buy-now" :to="{ name: 'product-detail', params: { id: product._id } }">Buy now</router-link> -->
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
        products: Array, 
    },

    // created() {
    //     this.getImageUrl();
    // },
    


    methods: {
        // getImageUrl(imageName) {
        //     // Replace this with the actual base image URL from your server
        //     return `http://localhost:3000/uploads/images/${imageName}`;
        // },
    }
};
</script>

<style scoped>
.product-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.category {
    margin-top: 20px;
    background-color: var(--color-bg);
    border-radius: 10px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: 500;
    font-size: 25px;
    width: 80%;
}

.product-list__category {
    display: flex;
    justify-items: center;
    align-items: center;
    background-color: var(--color-bg);
    border-radius: 10px;
    margin: 20px 95px;
    padding: 10px;
    width: calc(85% - 45px)
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
    height: 350px;
    width: 250px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;
}

.item:hover {
    transform: scale(1.05);
}

.img {
    margin-top: 5px;
    width: 200px;
    /* height: 200; */
    border: 2px solid black;
}

.img img {
    width: 100%;
    height: 200px;
    /* object-fit: contain; */
}

.details {
    margin-top: 10px;
}

.name {
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--black);
}

.price {
    font-size: 1.2rem;
    color: var(--black);
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