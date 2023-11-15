import createApiClient from "./api.user.service"

class AuthService {
    constructor(baseUrl = "/api/users") {
        this.apiClient = createApiClient(baseUrl)
    }

    // constructor(baseUrl = '/api/users') {
    //     this.apiClient = axios.create({
    //         baseURL: baseUrl,
    //     });
    // }

    async login(credentials){
        try {
            const response = await this.apiClient.post('/login', credentials);
            const { token, user } = response.data;

            // Store token and user data in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error) {
            throw error;
        }
    };

    logout(){
        // Clear token and user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    getUser(){
        // Retrieve user data from local storage
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };
}

export default new AuthService();