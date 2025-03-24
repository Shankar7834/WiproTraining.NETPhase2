import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login({ username, password }) // Use `username` instead of `email`
            .then(response => {
                setAuthUser(AuthService.getCurrentUser());
                alert('Login successful!');
                navigate('/students');
            })
            .catch(error => {
                alert('Invalid credentials');
            });
    };

    return (
        <div className="container mt-4 p-4 border rounded bg-light">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;

