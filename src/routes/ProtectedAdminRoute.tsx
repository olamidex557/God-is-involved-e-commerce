import {
    Navigate,
    Outlet,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedAdminRoute = () => {
    const {
        user,
        token,
    } = useAuth();

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (
        user?.role !==
        "admin"
    ) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
