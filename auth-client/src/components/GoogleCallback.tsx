
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GoogleCallback: React.FC = () => {
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      setAuthToken(token);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [location.search, setAuthToken, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
