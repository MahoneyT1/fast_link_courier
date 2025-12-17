/**
 * ProtectedRoute.tsx
 * @description: A higher-order component that protects routes from unauthorized access.
 * It checks if the user is authenticated before allowing access to the wrapped component.
 */

import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import axiosInstance from './AxiosInstance';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';



type AuthProviderProps = {
    children: React.ReactNode
}


const AuthContext = createContext({
    user: null as null | object,
    loading: true,
    isAdmin: null as null | boolean
});


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // User state
    const [user, setUser] = useState<null | object>(null);
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

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
