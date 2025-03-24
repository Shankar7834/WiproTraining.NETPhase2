import React, { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch users");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }, [url]);

    return { data ,loading,error}
}

export default useFetch;