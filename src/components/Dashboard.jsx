import { Link, Navigate } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
      <img src={user?.profilePicture} alt="" />
      <Link to='/createcommitment'>
      <button>create commitment</button>
      </Link>

    </div>
  );
};

export default Dashboard