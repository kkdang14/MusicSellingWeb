<template>
    <div class="add-product-page">
        <div class="container">
            <div class="add-new">Update Product</div>
            <div class="form">
                <form @submit.prevent="updateProduct()">
                    <div class="form-item">
                        <label class="label" for="title">Title</label><br />
                        <input class="input" type="text" id="title" placeholder="Product title" v-model="formData.title" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="artist">Artist</label><br />
                        <input class="input" type="text" id="artist" placeholder="Artist" v-model="formData.artist" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="desc">Description</label><br />
                        <input class="input" type="text" id="desc" placeholder="Description" v-model="formData.desc" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="img">Image</label><br />
                        <input class="input" type="file" id="img" accept="image/jpg, image/png" @change="handleFileUpload" />
                        <div v-if="formData.image">
                            {{ getFileName(formData.image) }}
                            <div v-if="imageChanged">{{ info }}</div>
                        </div>
                    </div>

                    <div class="form-item">
                        <label class="label" for="price">Price</label><br />
                        <input class="input" id="price" type="text" placeholder="Price" v-model="formData.price" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="category">Category</label><br />
                        <select class="input" id="category" v-model="formData.category">
                            <option value="" disabled>Choose the category</option>
                            <option value="Album">Album</option>
                            <option value="EP">EP</option>
                        </select>
                    </div>

                    <button type="submit" class="btn">Update</button>
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
            info: "Image data is being updated",
            imageChanged: false,
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
    mounted() {
        this.retrieve(this.$route.params.id);
    },

    methods: {
        async retrieve(productId) {
                try {
                    const product = await ProductService.getProductById(productId);
                    if (product) {
                        this.formData.title = product.title;
                        this.formData.artist = product.artist;
                        this.formData.desc = product.desc;
                        this.formData.image = product.image;
                        this.formData.price = product.price;
                        this.formData.category = product.category;
                    } else {
                        console.log("Product not found");
                    }

                    console.log(product)
                } catch (error) {
                    console.log(error);
                }
        },

        getFileName(file) {
        // Extract and return only the file name
            return file instanceof File ? file.name : file;
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            this.formData.image = file;
            this.imageChanged = true;
        },


        async updateProduct() {
            try {
                if (!this.formData.title || !this.formData.artist || !this.formData.image || !this.formData.price || !this.formData.category) {
                    toast.error('Please fill in all required fields.', { autoClose: 3000 });
                    return;
                }

                const formData = new FormData();
                formData.append('title', this.formData.title);
                formData.append('artist', this.formData.artist);
                formData.append('desc', this.formData.desc);
                formData.append('image', this.formData.image); // Append the image file
                formData.append('price', this.formData.price);
                formData.append('category', this.formData.category);
                const response = await ProductService.updateProduct(this.$route.params.id, this.formData);
                console.log(response);
                alert("Product was updated");
                this.$router.push({ name: "product-management" });
            } catch (error) {
                console.log(error);
            }
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
    width: 60%;
    height: 700px;
    text-align: center;
    /* margin-top: 10px; */
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
    font-size: 30px;
    margin-top: 10px;
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
