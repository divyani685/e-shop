import { BASE_URL } from "@/utils/config";
import { create } from "zustand";

type AuthState = {
  isUserLoading: boolean;
  user?: any;
  setUser: (user: any) => Promise<void>;
  setToken: (token: string) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
};
const useAuth = create<AuthState>((set) => ({
  isUserLoading: true,
  user: undefined,
  setUser: async (user: any) => {
    set({
      user: { ...user },
    });
  },
  async setToken(accessToken) {
    await localStorage.setItem("accessToken", JSON.stringify(accessToken));
  },
  async logout() {
    set({ user: undefined });
    await localStorage.removeItem("accessToken");
  },
  getUser: async () => {
    // console.log('getUser');
    try {
      const accessToken = await localStorage.getItem("accessToken");
      if (!accessToken) {
        set({ user: undefined, isUserLoading: false });
        return;
      }

      const res = await fetch(`${BASE_URL}/users/current/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // const data = await res.json();
      // console.log('data==>', data);

      if (res?.status === 401) {
        await localStorage?.removeItem("accessToken");
        set({ user: undefined, isUserLoading: false });
      }
      if (res?.status === 200) {
        const data = await res.json();

        const userData = data?.data;
        // console.log(data?.results?.user);
        set({ user: { ...userData }, isUserLoading: false });
      }
    } catch (error) {
      set({ user: {} });
    }
  },
}));

export default useAuth;
