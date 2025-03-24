import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import { CategoryProvider } from './services/CategoryService';
import CategoryList from './components/CategoryList';
import { TaskProvider } from './services/TaskService';

function App() {
  return (
    <TaskProvider>
  <CategoryProvider>
      <Dashboard />
  </CategoryProvider>
    </TaskProvider>
    
  );
}

export default App;
