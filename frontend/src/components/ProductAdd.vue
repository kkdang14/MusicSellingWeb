<template>
    <div class="add-product-page">
        <div class="container">
            <div class="add-new">Add New Product</div>
            <div class="form">
                <form @submit.prevent="add" action="" enctype="multipart/form-data" method="post">
                    <div class="form-item">
                        <label class="label" for="title">Title</label><br />
                        <input class="input" type="text" id="title" placeholder="Product title" v-model="formData.title" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="artist">Artist</label><br />
                        <input class="input" type="text" id="Artist" placeholder="Artist" v-model="formData.artist" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="desc">Description</label><br />
                        <input class="input" type="text" id="desc" placeholder="Description" v-model="formData.desc" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="img">Image</label><br />
                        <input class="input" type="file" id="img" accept="image/jpg, image/png" @change="handleFileUpload" />
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

                    <button type="submit" class="btn">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ProductService from '../services/products.service';
export default {
    data() {
        return {
            formData: {
                title: "",
                artist: "",
                desc: "",
                image: null,
                price: "",
                category: ""
            },
        };
    },

    computed: {
    },

    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0]; 
            this.formData.image = file;
        },

        async add() {
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
                const response = await ProductService.createProduct(this.formData);
                console.log(response);
                toast.success('Added successfully!', {
                    autoClose: 1200,
                })

                setTimeout(() => {
                    this.$router.push({ name: 'product-management' });
                }, 800);
            } catch (error) {
                console.log(error);
                const errorMessage = error.response?.data?.error || 'Error!';
                toast.error(errorMessage, { autoClose: 3000 });
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
    background-color: var(--white);
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
