import React from 'react';
import './BookCard.css'; // Ensure to create this CSS file for styling

const BookCard = ({ book, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(book);
    };

    return (
        <div className="book-card" data-testid="book-card">

        </div>
    );
};

export default BookCard;
