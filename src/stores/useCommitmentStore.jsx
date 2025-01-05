import {create} from 'zustand';
import axios from 'axios';

const useCommitmentStore = create((set, get) => ({
  commitments: [],
  fetchCommitments: async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3000/commitment', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ commitments: response.data });
    } catch (error) {
      console.error('Error fetching commitments:', error);
    }
  },
  updateCommitmentStatus: async (commitmentId, date, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(
        `http://localhost:3000/commitment/${commitmentId}/daily-status`,
        { date, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the store with the modified commitment
      set((state) => ({
        commitments: state.commitments.map((commitment) =>
          commitment._id === commitmentId ? response.data : commitment
        ),
      }));
      return response.data;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },
  addCommitment: async (newCommitment) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:3000/commitment',
        newCommitment,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({
        commitments: [...state.commitments, response.data],
      }));
      return response.data;
    } catch (error) {
      console.error('Error adding commitment:', error);
      throw error;
    }
  },

  // Computed properties for counts
  getPendingCount: () =>
    get().commitments.filter((commitment) => commitment.status === 'pending').length,
  getCompletedCount: () =>
    get().commitments.filter((commitment) => commitment.status === 'completed').length,
  getCancelledCount: () =>
    get().commitments.filter((commitment) => commitment.status === 'failed').length,
}));

export default useCommitmentStore;
