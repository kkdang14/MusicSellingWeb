import createApiClient from "./api.service"

class ProductService {
    constructor(baseUrl = "http://localhost:3000/api/products"){
        this.apiClient = createApiClient(baseUrl)
    }

    async createProduct(productData) {
        try {
            const response = await this.apiClient.post('/', productData)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const response = await this.apiClient.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const response = await this.apiClient.get(`/${productId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            const response = await this.apiClient.put(`/${productId}`, productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const response = await this.apiClient.delete(`/${productId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const response = await this.apiClient.delete('/');
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(productId, quantity) {
        try {
            const response = await axios.put(`/${productId}`, {
                quantity: quantity,
            });

            // Update local storage if the server request is successful
            const user = localStorage.getItem("user");
            if (user) {
                const userData = JSON.parse(user);
                const cartItem = userData.cart.find((item) => item.productId === productId);
                if (cartItem) {
                    cartItem.quantity = quantity;
                    localStorage.setItem("user", JSON.stringify(userData));
                }
            }

            return response.data;
        } catch (error) {
            console.error("Error updating product quantity:", error);
            throw error;
        }
    }
}

export default new ProductService();