import { useAuth } from '../../Utils/AuthProvider';


interface ProtectedAdminRouteProps {
    children: React.ReactNode
}



export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
    const { isAdmin } = useAuth();

    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    if (!isAdmin) {
        return <p className="text-center text-red-500 mt-10">Access Denied</p>;
    }

    return children;
}