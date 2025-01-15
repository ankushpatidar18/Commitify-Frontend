import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';
import useCommitmentStore from '@/stores/useCommitmentStore';
import useChallengeStore from '@/stores/useChallengeStore';

const Dashboard = () => {
  const { user, logout,rank } = useUserStore();
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const {commitments,fetchCommitments,getPendingCount, getCompletedCount, getCancelledCount} = useCommitmentStore();
  const {challenges,fetchChallenges,getPendingcount, getCompletedcount, getCancelledcount} = useChallengeStore();
  useEffect(() => {
      fetchCommitments();
      fetchChallenges();
    }, [fetchCommitments,fetchChallenges]);
  return (
    <div className="flex">
      {/* Left Block - 3/12 */}
      <div className="w-3/12 bg-white p-4 flex flex-col space-y-6 shadow-2xl">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <img
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0Ha8_yqcioV7zGcUuEdYQN8cAC9BkJ3Kag&s' || user?.profilePicture}
            alt="User"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">Happy {currentDay}!</p>
            <p className="text-sm text-gray-700">{user?.name}</p>
          </div>
        </div>

        {/* Commitments Overview */}
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-center text-lg font-semibold">
            You have <span className="text-blue-600">{getPendingCount()}</span> commitments ongoing.
          </p>
        </div>

        {/* Motivational Quote */}
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="italic text-center">
            "Commitment leads to action. Action brings your dream closer."
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <Link to="/commitment">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
              Create Commitment
            </button>
          </Link>
          <Link to='/challenges'>
          <button className="w-full px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600">
            Join Challenges
          </button>
          </Link>
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Block - 9/12 */}
      <div className="w-9/12 bg-white p-6">
        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-100 p-4 rounded shadow">
            <p className="text-center text-lg font-semibold">Total Credits</p>
            <p className="text-center text-2xl font-bold">{user?.credits || 0}</p>
          </div>
          <Link to='/leaderboard'>
          <div className="bg-gray-100 p-4 rounded shadow">
            <p className="text-center text-lg font-semibold">Rank</p>
            <p className="text-center text-2xl font-bold">#{rank}</p>
          </div>
          </Link>
          <div className="bg-gray-100 p-4 rounded shadow">
            <p className="text-center text-lg font-semibold">Badges</p>
            <p className="text-center text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Commitments Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Commitments</h2>
          <div className="flex items-center">
            {/* Left Info */}
            <div className="w-1/2 space-y-2">
              <p>Total Commitments: <span className="font-semibold">{commitments.length}</span></p>
              <p>Completed Commitments: <span className="font-semibold">{getCompletedCount()}</span></p>
              <p>Pending Commitments: <span className="font-semibold">{getPendingCount()}</span></p>
              <p>Failed Commitments: <span className="font-semibold">{getCancelledCount()}</span></p>
            </div>
            {/* Success Ratio */}
            <div className="w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center">
                  <p className="text-lg font-bold">{(getCancelledCount()+getCompletedCount()) && (getCompletedCount()/(getCancelledCount()+getCompletedCount()))*100}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenges Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Challenges</h2>
          <div className="flex items-center">
            {/* Left Info */}
            <div className="w-1/2 space-y-2">
              <p>Total Challenges: <span className="font-semibold">{challenges.length}</span></p>
              <p>Completed Challenges: <span className="font-semibold">{getCompletedcount()}</span></p>
              <p>Pending Challenges: <span className="font-semibold">{getPendingcount()}</span></p>
              <p>Failed Challenges: <span className="font-semibold">{getCancelledcount()}</span></p>
            </div>
            {/* Success Ratio */}
            <div className="w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                  <p className="text-lg font-bold">{(getCompletedcount()/(getCancelledcount()+getCompletedcount()))*100}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
