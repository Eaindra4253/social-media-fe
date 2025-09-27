import { EncryptStorage } from "encrypt-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const encryptStorage = new EncryptStorage("auth-storage");
export interface AuthState {
  auth?: LoginResponse;
  setAuthUser: (token: LoginResponse) => void;
  removeAuthUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: undefined,
      setAuthUser: (auth) => set(() => ({ auth })),
      removeAuthUser: () => {
        set(() => ({ auth: undefined }));
        encryptStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => encryptStorage.getItem(name),
        setItem: (name, value) => encryptStorage.setItem(name, value),
        removeItem: (name) => encryptStorage.removeItem(name),
      },
    }
  )
);
