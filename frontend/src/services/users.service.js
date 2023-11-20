import createApiClient from "./api.user.service"

class UserService {
    constructor(baseUrl = "http://localhost:3000/api/users"){
        this.apiClient = createApiClient(baseUrl)
    }
    // constructor(baseUrl = '/api/users') {
    //     this.apiClient = axios.create({
    //         baseURL: baseUrl,
    //     });
    // }

    async createUser(userData) {
        try {
            const response = await this.apiClient.post('/', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const response = await this.apiClient.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // async getFavorite(favorite) {
    //     try {
    //         const response = await this.apiClient.get('/', { favorite });
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async getUserById(userId) {
        try {
            const response = await this.apiClient.get(`/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await this.apiClient.put(`/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateFavorite(userId, favorite) {
        try {
            const response = await this.apiClient.put(`/${userId}`, { favorite });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(userId, cart) {
        try {
            const response = await this.apiClient.put(`/${userId}`, { cart });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductCart(userId, cart) {
        try {
            const response = await this.apiClient.put(`/${userId}`, { cart });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const response = await this.apiClient.delete(`/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(userId, cart) {
        try {
            const response = await this.apiClient.put(`/${userId}`, { productId: productId, 
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

export default new UserService();
