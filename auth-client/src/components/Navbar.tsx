import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AccountCircle, Logout, LockReset } from '@mui/icons-material';

const Navbar: React.FC = () => {
  const { user, logout, isGoogleLogin } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = () => {
    navigate('/reset-password');
    setShowMenu(false); // Close menu after navigation
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {user && (
        <div className="user-menu">
          <AccountCircle onClick={() => setShowMenu(!showMenu)} fontSize="large" />
          <span>{user.email}</span>
          {showMenu && (
            <div className="dropdown-menu">
              <ul>
                {!isGoogleLogin && (
                  <li>
                    <button onClick={handleResetPassword}>
                      <LockReset />
                      <span>Reset Password</span>
                    </button>
                  </li>
                )}
                <li>
                  <button onClick={logout}>
                    <Logout />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
