import { useState, useEffect } from "react"

export const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [counter, setCounter] = useState(0);
    const [url,setUrl] = useState("http://localhost:8000/products");
    console.log(products);
    useEffect(() => {

        fetch(url)
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [url]);

    useEffect(() => {
        console.log(counter);
    }, [counter]) //if  u modify this counter then only i will consoleit if counter is not there in array 
    //then console .log will be zero onl u are doing it in first button click of counter 

    return (

        <section>
            <div className="filter">
                <button onClick={() => setCounter(counter + 1)}>{counter}</button>
                <button onClick={() => setUrl("http://localhost:8000/products")}>All</button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock=true")}>In Stock Only</button>
            </div>
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <p className="id">{product.id}</p>
                    <p className="name">{product.name}</p>
                    <p className="info">
                        <span>${product.price}</span>
                        <span className={product.in_stock ? "instock" : "unavailable"}>{product.in_stock ? "In Stock" : "Unavailable"}
                        </span>
                    </p>
                </div>
            ))}
        </section>
    )
}
