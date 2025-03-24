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
        return axios.put(API_URL + id, formData, {
            headers: {
                ...this.getAuthHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    deleteStudent(id) {
        return axios.delete(API_URL + id, { headers: this.getAuthHeader() });
    }
}

export default new StudentService();

