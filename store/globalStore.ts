import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { db, auth } from "@/Firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import { onAuthStateChanged, User } from 'firebase/auth';

// Define proper types for better TypeScript support
interface UserData extends DocumentData {
    name?: string;
    email?: string;
    role?: string;
    createdAt?: Date;
    // Add other fields from your Firestore user document
}

export interface GlobalStore {
    // State variables
    isLoggedIn: boolean;
    user: User | null;
    userData: UserData | null;
    loading: boolean;

    // Methods
    setUser: (user: User | null) => void;
    setUserData: (userData: UserData | null) => void;
    setLoading: (loading: boolean) => void;
    initializeAuthListener: () => () => void;
    loadUserFromFirebase: () => (() => void) | undefined;
}

export const useGlobalStore = create<GlobalStore>()(
    persist(
        (set, get) => ({
            // Initial state
            isLoggedIn: false,
            user: null,
            userData: null,
            loading: true,

            // Basic setters
            setUser: (user: User | null) => set({ user }),
            setUserData: (userData: UserData | null) => set({ userData }),
            setLoading: (loading: boolean) => set({ loading }),

            // Firebase auth state listener
            initializeAuthListener: () => {
                // Return the unsubscribe function for cleanup
                return onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in
                        set({ user, isLoggedIn: true });
                        // Load additional user data from Firestore
                        get().loadUserFromFirebase();
                    } else {
                        // User is signed out
                        set({
                            isLoggedIn: false,
                            user: null,
                            userData: null,
                            loading: false
                        });
                    }
                });
            },

            // Load user data from Firestore
            loadUserFromFirebase: () => {
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    set({ loading: false });
                    return undefined;
                }

                // Create a reference to the user document
                const userDocRef = doc(db, "users", currentUser.uid);

                // Set up real-time listener for user data
                const unsubscribe = onSnapshot(userDocRef,
                    // Success handler
                    (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const userData = docSnapshot.data() as UserData;
                            set({
                                userData,
                                loading: false
                            });
                        } else {
                            // Document exists but is empty
                            console.warn(`User document exists but has no data for uid: ${currentUser.uid}`);
                            set({
                                userData: null,
                                loading: false
                            });
                        }
                    },
                    // Error handler  
                    (error) => {
                        console.error("Error fetching user data:", error);
                        // Don't reset user on error, just mark loading as complete
                        set({ loading: false });
                    }
                );

                // Return unsubscribe function for cleanup
                return unsubscribe;
            }
        }),
        {
            name: "global-store",
            storage: createJSONStorage(() => AsyncStorage),
            // Only persist necessary data and exclude functions/listeners
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData,
                // Don't persist the actual Firebase user object as it can cause issues
            }),
        }
    )
);

