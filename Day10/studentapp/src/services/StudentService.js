import axios from 'axios';

const API_URL = 'https://localhost:7272/api/Students/';

class StudentService {
    getAllStudents() {
        return axios.get(API_URL);
    }

    getStudentById(id) {
        return axios.get(API_URL + id);
    }

    createStudent(formData) {
        return axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    updateStudent(id, formData) {
        return axios.put(API_URL + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    deleteStudent(id) {
        return axios.delete(API_URL +id);
    }
}

export default new StudentService();
