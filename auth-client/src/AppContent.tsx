import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import GoogleCallback from './components/GoogleCallback';

const AppContent: React.FC = () => {
  const { isAuthenticated, logout, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated && !window.location.pathname.includes('/google/callback') && window.location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/"
          element={isAuthenticated ? (user?.role === 'ADMIN' ? <AdminDashboard /> : <Dashboard />) : <Login />}
        />
      </Routes>
      {isAuthenticated && (
        <footer>
          <button onClick={logout} className="button button-danger">Logout</button>
        </footer>
      )}
    </div>
  );
};

export default AppContent;
//commeted