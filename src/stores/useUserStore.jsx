import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  
  // Set user data
  setUser: (userData) => 
    set({ 
      user: userData,
      isAuthenticated: true 
    }),
  
  // Set authentication token
  setToken: (token) => 
    set({ token }),
  
  // Clear all auth data (logout)
  logout: () => 
    set({ 
      user: null,
      isAuthenticated: false,
      token: null 
    }),
}));

export default useUserStore;