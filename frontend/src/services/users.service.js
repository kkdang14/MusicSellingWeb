// import axios from 'axios';
import createApiClient from "./api.service"

class UserService {
    constructor(baseUrl = "/api/users"){
        this.apiClient = createApiClient(baseUrl)
    }
    // constructor(baseUrl = '/api/users') {
    //     this.apiClient = axios.create({
    //         baseURL: baseUrl,
    //     });
    // }

    // async login(userData) {
    //     try {
    //         const response = await this.apiClient.post('/', userData)
    //         const { token, user } = response.data;

    //         // Store token and user data in local storage
    //         localStorage.setItem('token', token);
    //         localStorage.setItem('user', JSON.stringify(user));

    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
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
