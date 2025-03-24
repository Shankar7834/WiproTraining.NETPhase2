import React, { Component } from "react";

export class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            counter: 0,
            url: "http://localhost:8000/products"
        };
    }

    fetchProducts = () => {
        fetch(this.state.url)
            .then(response => response.json())
            .then(data => this.setState({ products: data }));
    };

    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            this.fetchProducts();
        }
        if (prevState.counter !== this.state.counter) {
            console.log(this.state.counter);
        }
    }

    componentWillUnmount() {
        console.log("Component Unmounted");
    }

    render() {
        return (
            <section>
                <div className="filter">
                    <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>
                        {this.state.counter}
                    </button>
                    <button onClick={() => this.setState({ url: "http://localhost:8000/products" })}>All</button>
                    <button onClick={() => this.setState({ url: "http://localhost:8000/products?in_stock=true" })}>
                        In Stock Only
                    </button>
                </div>
                {this.state.products.map(product => (
                    <div className="card" key={product.id}>
                        <p className="id">{product.id}</p>
                        <p className="name">{product.name}</p>
                        <p className="info">
                            <span>${product.price}</span>
                            <span className={product.in_stock ? "instock" : "unavailable"}>
                                {product.in_stock ? "In Stock" : "Unavailable"}
                            </span>
                        </p>
                    </div>
                ))}
            </section>
        );
    }
}
