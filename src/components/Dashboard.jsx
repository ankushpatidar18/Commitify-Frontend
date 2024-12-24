import { Navigate } from 'react-router-dom';
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
    </div>
  );
};

export default Dashboard