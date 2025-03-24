import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const DashBoard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            <h2>Dashboard</h2>
            {isAuthenticated ? <p>Welcome to your dashboard!</p> : <p>Please log in to access this page.</p>}
        </div>
    );
};

export default DashBoard;
