import { MyInfoResponseDto as UserInfo } from "@banbok/shared";

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
  hasHydrated: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}
