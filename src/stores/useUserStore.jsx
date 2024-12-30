import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      
      setUser: (userData) => 
        set({ 
          user: userData,
          isAuthenticated: !!userData
        }),
      
      setToken: (token) => 
        set({ token }),
      
        
      logout: () => {
        localStorage.removeItem('authToken');
        set({ 
          user: null,
          isAuthenticated: false,
          token: null
        }, true);
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;