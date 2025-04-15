import React, { useContext, useEffect } from 'react';
import './App.css';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Header from './components/others/Header';

import { AuthContext } from './components/Auth/AuthProvider';
import { setLocalStorage } from './utils/LocalStorage';

function App() {
  const { userData, setUserData, logout } = useContext(AuthContext);

  useEffect(() => {
    setLocalStorage();
  }, []);

  const handleLogin = (username, password) => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return false;
    }

    const employee = userData?.employees?.find(e => e.Username === username && e.Password === password);
    const adminn = userData?.admin?.find(e => e.Username === username && e.Password === password);

    if (employee) {
      setUserData({ ...userData, currentUser: 'employee', username }); // ✅ Store username
      return true;
    }

    if (adminn) {
      setUserData({ ...userData, currentUser: 'admin', username }); // ✅ Store admin username
      return true;
    }

    alert("Invalid Credentials");
    return false;
  };

  return (
    <div>
      {userData?.currentUser && <Header username={userData.username} onLogout={logout} />} {/* ✅ Pass username */}
      {!userData?.currentUser ? (
        <Login handleLogin={handleLogin} />
      ) : userData.currentUser === 'employee' ? (
        <EmployeeDashboard logout={logout} />
      ) : (
        <AdminDashboard logout={logout} />
      )}
    </div>
  );
}

export default App;
