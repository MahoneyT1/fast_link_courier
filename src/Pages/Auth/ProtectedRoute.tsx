/**
 * ProtectedRoute.tsx
 * @description: A higher-order component that protects routes from unauthorized access.
 * It checks if the user is authenticated before allowing access to the wrapped component.
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../Utils/AuthProvider';


const ProtectedRoute: React.FC = () => {

    // descructure Auth context
    const auth = useAuth();
    const location = useLocation();

    // If still checking authentication status, you can return a loading indicator
    // if (Auth?.checkingAuth) {
    //     return <div className='flex justify-center items-center 
    //     w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin'>Loading...</div>;
    // }

    // If not authenticated, you can redirect to login or show an unauthorized message
    if (!auth.user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    // If authenticated, render the children components
    return auth.user ? < Outlet/> : <Navigate to="/login" />;
};

export default ProtectedRoute;