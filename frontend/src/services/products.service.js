import createApiClient from "./api.service"

class ProductService {
    constructor(baseUrl = "/api/products"){
        this.apiClient = createApiClient(baseUrl)
    }

    async createProduct(productData) {
        try {
            const response = await this.apiClient.post('/', productData);
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
}

export default new ProductService();