import React from 'react';
import BookCard from './BookCard';

// Updated booksData with additional fields
const booksData = [

];

const BookCategory = ({ category, addToCart }) => {
    const filteredBooks = booksData.filter(book => book.category === category);

    return (
        <div className="book-category" data-testid="book-category">

        </div>
    );
};

export default BookCategory;
