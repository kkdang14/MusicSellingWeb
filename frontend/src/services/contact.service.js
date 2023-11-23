import createApiClient from "./api.contact.service"

class ContactService {
    constructor(baseUrl = "http://localhost:3000/api/contacts") {
        this.apiClient = createApiClient(baseUrl)
    }

    async sendMessage(data) {
        try {
            const response = await this.apiClient.post('/', data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllMessage() {
        try {
            const response = await this.apiClient.get('/')
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ContactService()