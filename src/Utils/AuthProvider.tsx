/**
 * ProtectedRoute.tsx
 * @description: A higher-order component that protects routes from unauthorized access.
 * It checks if the user is authenticated before allowing access to the wrapped component.
 */

import { useContext, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import type { User } from 'firebase/auth';


type AuthProviderProps = {
    children: React.ReactNode
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    resetPassword: async () => { }
});


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // User state
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                try {
                    const token = await currentUser.getIdTokenResult();
                    // set isAdmin based on a custom claim (adjust claim name as needed)
                    setIsAdmin(Boolean(token.claims && token.claims.admin));
                } catch (err) {
                    console.error('Failed to get ID token result', err);
                    setIsAdmin(false);
                }
            }
            else {
                setIsAdmin(false)
            }
        })
        return () => unsubscribe();
    }, [])

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, resetPassword }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
