
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GoogleCallback: React.FC = () => {
  const { getProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getProfile();
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    };

    fetchProfile();
  }, [getProfile, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
