<template>
    <div class="add-product-page">
        <div class="container">
            <div class="add-new">{{ isEditing ? "Edit Product" : "Add New Product" }}</div>
            <div class="form">
                <form @submit.prevent="isEditing ? updateProduct() : addProduct()">
                    <div class="form-item">
                        <label class="label" for="title">Title</label><br />
                        <input class="input" type="text" id="title" placeholder="Product title" v-model="formData.title" :disabled="isEditing" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="artist">Artist</label><br />
                        <input class="input" type="text" id="artist" placeholder="Artist" v-model="formData.artist" :disabled="isEditing" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="desc">Description</label><br />
                        <input class="input" type="text" id="desc" placeholder="Description" v-model="formData.desc" :disabled="isEditing" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="img">Image</label><br />
                        <input class="input" id="img" type="text" placeholder="Image" v-model="formData.image" :disabled="isEditing" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="price">Price</label><br />
                        <input class="input" id="price" type="text" placeholder="Price" v-model="formData.price" :disabled="isEditing" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="category">Category</label><br />
                        <select class="input" id="category" v-model="formData.category" :disabled="isEditing">
                            <option value="" disabled>Choose the category</option>
                            <option value="Album">Album</option>
                            <option value="EP">EP</option>
                        </select>
                    </div>

                    <button type="submit" class="btn">{{ isEditing ? "Update" : "Create" }}</button>
                    <button type="button" class="btn-cancel" @click="cancelEdit">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/products.service';

export default {
    data() {
        return {
            isEditing: false,
            formData: {
                title: "",
                artist: "",
                desc: "",
                image: "",
                price: "",
                category: ""
            },
        };
    },
    computed: {
        productId() {
            // You can get the product ID from the route parameter or any other source
            return this.$route.params.id;
        },
    },
    async created() {
        if (this.productId) {
            // If a product ID is provided in the route, load the product for editing
            this.isEditing = true;
            try {
                const product = await ProductService.getProductById(this.productId);
                if (product) {
                    this.formData = { ...product };
                } else {
                    // Handle the case where the product ID is not valid or the product doesn't exist.
                    console.log("Product not found");
                    this.cancelEdit();
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    methods: {
        async addProduct() {
            try {
                const response = await ProductService.createProduct(this.formData);
                console.log(response.data);
                alert("New product was added");
                this.$router.push({ name: "product-management" });
            } catch (error) {
                console.log(error);
            }
        },
        async updateProduct() {
            try {
                const response = await ProductService.updateProduct(this.productId, this.formData);
                console.log(response.data);
                alert("Product was updated");
                this.$router.push({ name: "product-management" });
            } catch (error) {
                console.log(error);
            }
        },

        cancelEdit() {
            // Redirect back to the product management page or take any other action to cancel the edit.
            this.$router.push({ name: "product-management" });
        },
    },
};
</script>

<style scoped>
.add-product-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.container {
    width: 80%;
    width: 500px;
    height: 700px;
    text-align: center;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
    font-size: 30px;
    margin-bottom: 20px;
}

.form-item {
    text-align: left;
    padding: 10px
}

.label {
    font-weight: bold;
}

.input {
    width: 100%;
    /* height: 40px; */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn {
    margin-top: 20px;
    padding: 10px 20px;
    width: 30%;
    background-color: var(--black);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: var(--black-hover);
    color: var(--white)
}
</style>
