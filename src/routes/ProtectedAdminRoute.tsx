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

    console.log("TOKEN =", token);
    console.log("USER =", user);
    console.log("ROLE =", user?.role);

    console.log("TOKEN =", token);
    console.log("USER =", user);
    console.log("ROLE =", user?.role);

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