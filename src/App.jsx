import { useState } from 'react';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import LoginForm from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate authentication (replace with actual auth logic)
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <AdminDashboard /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
}

export default App;
