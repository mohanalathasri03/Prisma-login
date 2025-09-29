import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AccountCircle } from '@mui/icons-material';

const Navbar: React.FC = () => {
  const { user, logout, isGoogleLogin } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <Link to="/">Home</Link>
      {user && (
        <div className="user-menu">
          <AccountCircle onClick={() => setShowMenu(!showMenu)} />
          <span>{user.email}</span>
          {showMenu && (
            <div className="dropdown-menu">
              <ul>
                <li><button onClick={logout}>Logout</button></li>
                {!isGoogleLogin && (
                  <li><Link to="/reset-password">Reset Password</Link></li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
