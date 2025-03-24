import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { TaskProvider } from './services/TaskService';
import { CategoryProvider } from './services/CategoryService';

// Custom render function to include context providers
const renderWithProviders = (ui) => {
  return render(
    <TaskProvider>
      <CategoryProvider>
        {ui}
      </CategoryProvider>
    </TaskProvider>
  );
};

describe('To-Do List Application', () => {
  test('renders the dashboard', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/To-Do List Dashboard/i)).toBeInTheDocument();
  });

  test('adds a category', () => {
    renderWithProviders(<App />);
    
    // Adding a new category
    const categoryInput = screen.getByPlaceholderText(/New Category/i);
    const addCategoryButton = screen.getByText(/Add Category/i);
    
    fireEvent.change(categoryInput, { target: { value: 'Work' } });
    fireEvent.click(addCategoryButton);
    
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });

  test('adds a task', () => {
    renderWithProviders(<App />);
    
    // Adding a new task
    const taskInputTitle = screen.getByPlaceholderText(/Task Title/i);
    const taskInputDescription = screen.getByPlaceholderText(/Task Description/i);
    const taskInputDueDate = screen.getByPlaceholderText(/Due Date/i);
    const addTaskButton = screen.getByText(/Add Task/i);
    
    fireEvent.change(taskInputTitle, { target: { value: 'Finish project' } });
    fireEvent.change(taskInputDescription, { target: { value: 'Complete the React project' } });
    fireEvent.change(taskInputDueDate, { target: { value: '2024-09-30' } });
    fireEvent.click(addTaskButton);
    
    expect(screen.getByText(/Finish project/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete the React project/i)).toBeInTheDocument();
  });

  test('edits a task', () => {
    renderWithProviders(<App />);
    
    // Add a task first
    const taskInputTitle = screen.getByPlaceholderText(/Task Title/i);
    const taskInputDescription = screen.getByPlaceholderText(/Task Description/i);
    const taskInputDueDate = screen.getByPlaceholderText(/Due Date/i);
    const addTaskButton = screen.getByText(/Add Task/i);
    
    fireEvent.change(taskInputTitle, { target: { value: 'Finish project' } });
    fireEvent.change(taskInputDescription, { target: { value: 'Complete the React project' } });
    fireEvent.change(taskInputDueDate, { target: { value: '2024-09-30' } });
    fireEvent.click(addTaskButton);
    
    // Edit the task
    const editButton = screen.getByText(/Edit Task/i);
    fireEvent.click(editButton);
    
    const newTaskInputTitle = screen.getByPlaceholderText(/Task Title/i);
    fireEvent.change(newTaskInputTitle, { target: { value: 'Finish project with tests' } });
    fireEvent.click(addTaskButton);
    
    expect(screen.getByText(/Finish project with tests/i)).toBeInTheDocument();
  });

  test('deletes a task', () => {
    renderWithProviders(<App />);
    
    // Add a task first
    const taskInputTitle = screen.getByPlaceholderText(/Task Title/i);
    const taskInputDescription = screen.getByPlaceholderText(/Task Description/i);
    const taskInputDueDate = screen.getByPlaceholderText(/Due Date/i);
    const addTaskButton = screen.getByText(/Add Task/i);
    
    fireEvent.change(taskInputTitle, { target: { value: 'Finish project' } });
    fireEvent.change(taskInputDescription, { target: { value: 'Complete the React project' } });
    fireEvent.change(taskInputDueDate, { target: { value: '2024-09-30' } });
    fireEvent.click(addTaskButton);
    
    // Delete the task
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText(/Finish project/i)).not.toBeInTheDocument();
  });
});
