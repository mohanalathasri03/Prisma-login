import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container user-dashboard">
      <h2>Welcome User</h2>
      {user && (
        <table className="user-details-table">
          <tbody>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td><strong>Role:</strong></td>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;

