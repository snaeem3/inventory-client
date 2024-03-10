import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../apiClient';
import Loading from '../components/Loading';

const Users = (props) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error getting users: ', error);
    }
  };

  useEffect(() => {
    getUsers();
    setLoading(false);
  }, []);

  return (
    <main className="users-page">
      <h1>Users</h1>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Users;
