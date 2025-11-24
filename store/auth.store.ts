import { create } from 'zustand';
import { currentUser } from '../lib/_appwrite';

export interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  setUser: (user) => set({ user }),

  setIsLoading: (value) => set({ isLoading: value }),

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      const userResponse = await currentUser();

      if (userResponse) {
        const formattedUser: User = {
          $id: userResponse.$id,
          name: userResponse.name,
          email: userResponse.email,
          avatar: userResponse.prefs?.avatar || "", // fallback
        };

        set({
          isAuthenticated: true,
          user: formattedUser,
        });

      } else {
        set({
          isAuthenticated: false,
          user: null,
        });
      }
    } catch (error) {
      console.log("Error fetching authenticated user:", error);

      set({
        isAuthenticated: false,
        user: null,
      });

    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
