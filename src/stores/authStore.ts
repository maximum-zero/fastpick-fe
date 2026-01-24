import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,

  login: (accessToken, refreshToken, user) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    set({ accessToken, refreshToken, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: () => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && storedRefreshToken) {
      try {
        const user: User = JSON.parse(storedUser);
        set({
          accessToken: storedToken,
          refreshToken: storedRefreshToken,
          user,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        // Clear invalid data
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      }
    }
  },
}));

export default useAuthStore;

