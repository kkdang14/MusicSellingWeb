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

    async getUserClient() {
        try {
            const response = await this.apiClient.get('/getUser')
            response.data;
        } catch (error) {
            throw error
        }
    }

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

    async deleteUser(userId) {
        try {
            const response = await this.apiClient.delete(`/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
