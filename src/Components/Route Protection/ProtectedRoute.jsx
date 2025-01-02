import { Navigate, Outlet } from "react-router-dom";
import React from 'react'

export default function ProtectedRoute({ allowedRoles }) {
    const user = JSON.parse(localStorage.getItem('user')); //Fetch user info from local storage

    //Check if user exists and their role is allowed
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to='/' replace />;
    }
    return <Outlet/>
}
