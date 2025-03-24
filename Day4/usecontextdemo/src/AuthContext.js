import React, { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    function login() {
        setIsAuthenticated(true);
    }
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

