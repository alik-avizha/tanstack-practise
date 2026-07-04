import {
  isAuthenticated,
  signIn,
  signOut,
} from "../utils/auth.ts";

export const useAuth = () => ({
  signIn,
  signOut,
  isLogged: isAuthenticated,
});

export type AuthContext = ReturnType<typeof useAuth>;
