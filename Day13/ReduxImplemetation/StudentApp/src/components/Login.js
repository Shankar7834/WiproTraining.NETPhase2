import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // If user is already logged in, redirect to students page
    useEffect(() => {
        if (user) {
            navigate("/students");
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    return (
        <div className="container mt-4 p-4 border rounded bg-light">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
