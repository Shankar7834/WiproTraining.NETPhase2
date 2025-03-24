import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";

const UserList = () => {
    const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
   

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{color:"white"}}>
            <h2>User List</h2>
            <ul>
                {data.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

