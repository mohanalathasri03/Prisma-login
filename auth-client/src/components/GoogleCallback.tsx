
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GoogleCallback: React.FC = () => {
  const { setAuthToken, getProfile, setIsGoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (token) {
        setAuthToken(token);
        setIsGoogleLogin(true);
        await getProfile();
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    };

    handleAuth();
  }, [location.search, setAuthToken, navigate, getProfile, setIsGoogleLogin]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
