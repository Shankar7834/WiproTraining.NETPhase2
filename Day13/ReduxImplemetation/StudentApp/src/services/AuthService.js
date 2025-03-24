import axios from 'axios';

const API_URL = 'https://localhost:7272/api/Auth';

class AuthService {
    register(userData) {
        return axios.post(`${API_URL}?role=${userData.role}`, userData);
        // Sending role as query parameter instead of in request body
    }

    login(userData) {
        return axios.post(API_URL + '/login', userData)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();








