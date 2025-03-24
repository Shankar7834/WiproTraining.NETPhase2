import { render, screen } from '@testing-library/react';
import App from './App';
import { fireEvent, render, screen } from '@testing-library/react';
// import ReactTestUtils from 'react-dom/test-utils'; (commented out or missing)

import BookCard from './components/BookCard';
import BookCategory from './components/BookCategory';
import BooksPage from './components/BooksPage';
import HomePage from './components/HomePage';
import PurchaseForm from './components/PurchaseForm';

const book = {
  id: 1,
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  category: 'Fiction',
  coverImageUrl: 'https://m.media-amazon.com/images/I/91SpClgnqDL._AC_UF1000,1000_QL80_.jpg',
  description: 'A novel set in the American South during the 1930s, focusing on the Finch family and the moral growth.',
  price: 123
};

const addToCart = (book) => {
  // Function implementation
};

test('check Book Card loaded or not', () => {
  render(<BookCard book={book} addToCart={addToCart} />);
  const counter = screen.getByTestId('book-card');
  expect(counter).toBeInTheDocument();
});

test('check books page loaded or not', () => {
  render(<BooksPage addToCart={addToCart} />);
  const counter = screen.getByTestId("books-page");
  expect(counter).toBeInTheDocument();
});

test('check home page loaded or not', () => {
  render(<HomePage addToCart={addToCart} />);
  const counter = screen.getByTestId("home-page");
  expect(counter).toBeInTheDocument();
});

test('check purchase-form loaded or not', () => {
  render(<PurchaseForm />);
  const counter = screen.getByTestId("purchase-form");
  expect(counter).toBeInTheDocument();
});

describe('PurchaseForm Component', () => {
  const clearCartMock = jest.fn();

  test('renders PurchaseForm and handles form submission', () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <PurchaseForm cart={[]} clearCart={clearCartMock} />
    );
  });
});

// Check if the form elements are rendered
expect(getByLabelText(/name/i)).toBeInTheDocument();
expect(getByLabelText(/email/i)).toBeInTheDocument();
expect(getByLabelText(/address/i)).toBeInTheDocument();
expect(getByLabelText(/payment method/i)).toBeInTheDocument();
expect(getByText(/submit purchase/i)).toBeInTheDocument();

// Fill out the form
fireEvent.change(getByLabelText(/name/i), { target: { value: 'John Doe' } });
fireEvent.change(getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
fireEvent.change(getByLabelText(/address/i), { target: { value: '123 Main St' } });
fireEvent.change(getByLabelText(/payment method/i), { target: { value: 'paypal' } });

// Submit the form
fireEvent.submit(getByTestId('purchase-form'));

describe('PurchaseForm Component', () => {
  const clearCartMock = jest.fn();

  test('purchase form with dummy data', () => {
    const { getByLabelText, getByTestId } = render(
      <PurchaseForm cart={[]} clearCart={clearCartMock} />
    );

    // Fill out the form
    fireEvent.change(getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(getByLabelText(/payment method/i), { target: { value: 'paypal' } });

    // Submit the form
    fireEvent.submit(getByTestId('purchase-form'));
  });
});
