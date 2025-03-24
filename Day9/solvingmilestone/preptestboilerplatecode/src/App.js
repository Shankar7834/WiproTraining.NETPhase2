import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart(prevCart => [...prevCart, book]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="App" data-testid="App">
      </div>
    </Router>
  );
}

export default App;
