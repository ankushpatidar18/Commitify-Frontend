import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Challenges</h1>
      {challenges.length === 0 ? (
        <p>No challenges available</p>
      ) : (
        challenges.map((challenge) => (
          <div key={challenge._id} className="challenge-card">
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
            <p>Duration: {challenge.duration} days</p>
            <p>Start Date: {new Date(challenge.start_date).toLocaleDateString()}</p>
            <button>Join</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ChallengesList;
