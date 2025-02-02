import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios" 

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      rank: null,

      setUser: (userData) =>
        set({
          user: userData,
          isAuthenticated: !!userData,
        }),

      setToken: (token) => set({ token }),

      setRank: (rank) => set({ rank }),

      logout: () => {
        localStorage.removeItem("authToken")
        set(
          {
            user: null,
            isAuthenticated: false,
            token: null,
            rank: null,
          },
          true,
        )
      },

      // New method to refresh user data
      refreshUserData: async () => {
        try {
          const token = get().token || localStorage.getItem("authToken")
          if (!token) {
            console.error("No token found")
            return
          }

          const response = await axios.get("http://localhost:3000/auth/user", {
            headers: { Authorization: `Bearer ${token}` },
          })

          set({
            user: response.data,
            isAuthenticated: true,
          })
        } catch (error) {
          console.error("Error refreshing user data:", error)
        }
      },
    }),
    {
      name: "user-storage",
    },
  ),
)

export default useUserStore

