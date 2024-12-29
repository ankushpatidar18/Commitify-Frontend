import { Link, Navigate } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';
import CommitmentCalendar from './CommitmentCalendar';

const Dashboard = () => {
  const { user,logout } = useUserStore();



  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
      <img src={user?.profilePicture} alt="" />
      <Link to='/createcommitment'>
      <button>create commitment</button>
      </Link>
      <div>
        <CommitmentCalendar/>
      </div>

    </div>
  );
};

export default Dashboard