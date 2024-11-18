import React, { Component } from "react";
import { Route, redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
    const userRole = localStorage.getItem('role'); //Fetch role from localStorage

    return (
        <Route 
            {...rest}
            render = {(props) => 
                userRole === role ? (
                    <Component {...props}/>
                ) : (
                    <redirect to= '/' /> //Redirect if user doesn't have right role
                )
            }
        />
    )
};

export default ProtectedRoute;