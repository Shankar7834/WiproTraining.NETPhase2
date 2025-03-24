import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'https://localhost:7272/api/Students/';

class StudentService {
    getAuthHeader() {
        const user = AuthService.getCurrentUser();
        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }

    getAllStudents() {
        return axios.get(API_URL, { headers: this.getAuthHeader() });
    }

    getStudentById(id) {
        return axios.get(API_URL + id, { headers: this.getAuthHeader() });
    }

    createStudent(formData) {
        return axios.post(API_URL, formData, {
            headers: {
                ...this.getAuthHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    updateStudent(id, formData) {
        console.log("Updating Student:", id, formData); // Debugging log
        return axios.put(`${API_URL}${id}`, formData, {
            headers: {
                ...this.getAuthHeader(),
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log("API Response:", response.data); // Log API response
            return response;
        }).catch(error => {
            console.error("Update Error:", error.response?.data || error.message);
        });
    }




    deleteStudent(id) {
        return axios.delete(API_URL + id, { headers: this.getAuthHeader() });
    }
}

export default new StudentService();

