import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Login = () => {
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>{isAuthenticated ? "Welcome, User!" : "Please log in"}</h2>
            {isAuthenticated ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={login}>Login</button>
            )}
        </div>
    );
};

export default Login;

