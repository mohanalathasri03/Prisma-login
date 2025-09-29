import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, getProfile } = useContext(AuthContext);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>User Profile</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
