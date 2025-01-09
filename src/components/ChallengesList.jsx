import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JoinedChallengeList from './JoinedChallengeList';

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/challenges', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        alert('Failed to load challenges. Try again.');
      }
    };
    fetchChallenges();
  }, []);

  const joinChallenge = async (challengeId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:3000/challenges/join',
        { challenge_id: challengeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Joined successfully:', response.data);
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  return (
    <>
    <div>
      <h1 className='font-bold'>Challenges</h1>
      {challenges.length === 0 ? (
        <p>No challenges available</p>
      ) : (
        challenges.map((challenge) => (
          <div key={challenge._id} className="challenge-card">
            <h2>{challenge.title}</h2>
            <h2>Created By:{challenge.creator_id.name}</h2>
            <p>{challenge.description}</p>
            <p>Duration: {challenge.duration} days</p>
            <p>Start Date: {new Date(challenge.start_date).toLocaleDateString()}</p>
            <button onClick={() => joinChallenge(challenge._id)}>Join</button>
          </div>
        ))
      )}
    </div>
    <JoinedChallengeList/>
    </>
  );
};

export default ChallengesList;
