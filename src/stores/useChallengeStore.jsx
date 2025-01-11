import {create} from 'zustand';
import axios from 'axios';

const useChallengeStore = create((set,get) => ({
  challenges: [],
  fetchChallenges: async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3000/challenges/participants', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ challenges: response.data });
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  },
  updateChallengeProgress: async (challenge_id, date, status) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(
        `http://localhost:3000/challenges/progress/update`,
        {challenge_id, date, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Re-fetch challenges after update
      set((state) => ({
        challenges: state.challenges.map((challenge) =>
          challenge.challenge_id === challenge_id
            ? {
                ...challenge,
                progress: challenge.progress.map((entry) =>
                  new Date(entry.date).toDateString() === new Date(date).toDateString()
                    ? { ...entry, status }
                    : entry
                ),
              }
            : challenge
        ),
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  },
  // Computed properties for counts
  getPendingcount: () =>
    get().challenges.filter((challenge) => challenge.status === 'pending').length,
  getCompletedcount: () =>
    get().challenges.filter((challenge) => challenge.status === 'completed').length,
  getCancelledcount: () =>
    get().challenges.filter((challenge) => challenge.status === 'failed').length,
}));

export default useChallengeStore;
