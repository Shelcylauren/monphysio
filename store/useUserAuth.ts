import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type UserAuthState = {
    hasFinishedOnboarding: boolean;
    toggleHasOnboarded: () => void;
}

export const useUserAuth = create<UserAuthState>()(
    persist( (set) => ({
            hasFinishedOnboarding: false, // default value
            // Function to toggle the onboarding state
            toggleHasOnboarded: () => set((state) => ({ hasFinishedOnboarding: !state.hasFinishedOnboarding })),
        }),
        {
            name: 'user-auth-storage', // unique name
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage as the storage engine
        }
    )
)










