import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user) {
        if (user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </div>
<div className="button-container">
          <button type="submit" className="button button-primary">Login</button>
          <div className="or-separator">
    <span className="line"></span>
    <span className="or-text">OR</span>
    <span className="line"></span>
  </div>
          <button type="button" onClick={() => window.location.href='http://localhost:3000/auth/google'} className="button button-primary">Login with Google</button>
        </div>
        <p className="link-text">
          New user? <Link to="/register" className='link'>Register here</Link></p>
      </form>
    </div>
  );
};

export default Login;