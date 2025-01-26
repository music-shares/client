// components/PrivateAdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
const PrivateAdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const isAdmin = user?.email === "drogogaming.com@gmail.com";

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateAdminRoute;