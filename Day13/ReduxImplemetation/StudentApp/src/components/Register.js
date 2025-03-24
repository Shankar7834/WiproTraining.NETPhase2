import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); // Default role is "User"
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const userData = {
            username,
            email,
            password,
            role  // Role is included here
        };

        AuthService.register(userData)
            .then(response => {
                alert(`User registered successfully as ${role}! Please login.`);
                navigate('/login');
            })
            .catch(error => {
                alert(error.response?.data?.message || 'Registration failed. Please try again.');
            });
    };

    return (
        <div className="container mt-4 p-4 border rounded bg-light">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Role</label>
                    <select
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
