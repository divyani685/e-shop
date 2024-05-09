import {
  BASE_URL,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/config";
import { create } from "zustand";

type UserType = {
  id: string;
  manufacturename: string;
  email: string;
  fullName: string;
  name: string;
  role: string;
  phone: number;
};
type AuthState = {
  isUserLoading: boolean;
  user?: Partial<UserType>;
  setUser: (user: Partial<UserType>) => Promise<void>;
  setToken: (token: string) => Promise<void>;
  logout: () => void;
  getUser: () => void;
};

const useAuth = create<AuthState>((set) => ({
  isUserLoading: true,
  user: {},
  setUser: async (user: Partial<UserType>) => {
    set({ user: { ...user } });
  },
  async setToken(accessToken) {
    await localStorage.setItem("ACCESS_TOKEN", JSON.stringify(accessToken));
  },
  logout() {
    set({ user: undefined });
    removeFromLocalStorage("ACCESS_TOKEN");
  },
  getUser: async () => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      set({ user: {}, isUserLoading: false });
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res?.status !== 200) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
      }
      if (res?.status === 200) {
        const jsonData = await res.json();

        const userData = jsonData?.data;
        set({ user: { ...userData }, isUserLoading: false });
      }
    } catch (error) {
      set({ user: {} });
    }
  },
}));

export default useAuth;
