export interface UserInfo {
  id?: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
  hasHydrated: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}
