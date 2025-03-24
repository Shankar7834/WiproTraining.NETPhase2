import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { EventProvider } from './services/EventService';
import { EventCategoryProvider } from './services/EventCategoryService';

// Custom render function to include context providers
const renderWithProviders = (ui) => {
  return render(
    <EventProvider>
      <EventCategoryProvider>
        {ui}
      </EventCategoryProvider>
    </EventProvider>
  );
};

describe('Event Management Application', () => {
  test('renders the event dashboard', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Event Dashboard/i)).toBeInTheDocument();
  });

  test('adds an event category', () => {
    renderWithProviders(<App />);

    const categoryInput = screen.getByPlaceholderText(/New Category/i);
    const addCategoryButton = screen.getByText(/Add Category/i);

    fireEvent.change(categoryInput, { target: { value: 'Conference' } });
    fireEvent.click(addCategoryButton);

    expect(screen.getByText(/Conference/i)).toBeInTheDocument();
  });

  test('adds an event', () => {
    renderWithProviders(<App />);

    const eventTitle = screen.getByPlaceholderText(/Event Title/i);
    const eventDate = screen.getByPlaceholderText(/Event Date/i);
    const eventLocation = screen.getByPlaceholderText(/Event Location/i);
    const addEventButton = screen.getByText(/Add Event/i);

    fireEvent.change(eventTitle, { target: { value: 'React Workshop' } });
    fireEvent.change(eventDate, { target: { value: '2024-10-01' } });
    fireEvent.change(eventLocation, { target: { value: 'New York' } });
    fireEvent.click(addEventButton);

    expect(screen.getByText(/React Workshop/i)).toBeInTheDocument();
  });
});
