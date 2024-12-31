import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      rank: null, // Add rank property
      
      setUser: (userData) =>
        set({ 
          user: userData,
          isAuthenticated: !!userData,
        }),
      
      setToken: (token) =>
        set({ token }),
      
      setRank: (rank) => set({ rank }), // Add setRank method
      
      logout: () => {
        localStorage.removeItem('authToken');
        set({ 
          user: null,
          isAuthenticated: false,
          token: null,
          rank: null, // Reset rank on logout
        }, true);
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
