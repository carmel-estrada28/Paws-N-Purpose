import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); 
  // <'login' | 'dashboard'> means that only login or dashboard could be the current page

  if(currentPage === 'login') {
    return <LoginPage onLogin={() => setCurrentPage('dashboard')} />;
  }

  return <Dashboard />;
}

export default App;
