/**
 * ProtectedRoute.tsx
 * @description: A higher-order component that protects routes from unauthorized access.
 * It checks if the user is authenticated before allowing access to the wrapped component.
 */

import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import location from 'react-router-dom';
import axiosInstance from './AxiosInstance';


interface AuthContextType {
    isAuthenticated: boolean,
    setIsAuthenticated: (auth: boolean ) => void,
    checkAuth: ()=> Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {!false},
    checkAuth: async ()=>{},
})

// create a custom hook for easier access to the Auth context
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }: { children: ReactNode })=> {
    // provides all auth or data globally

    // initialize state variables
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
    
    const checkAuth = async ()=> {
        try {
            const response = await axiosInstance.get('auth-verify/', { withCredentials: true });
            if (response.status === 200 ) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }
        catch (error) {
            setIsAuthenticated(false);
            console.error("Error checking auth status:", error);
        }
    }
 

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth }}>
            { children }
        </AuthContext.Provider>
    )
}
