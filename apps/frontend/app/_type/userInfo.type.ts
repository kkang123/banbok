import { MyInfoResponseDto as UserInfo } from "@banbok/shared";

export interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
  hasHydrated: boolean;
  token: string | null;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}
