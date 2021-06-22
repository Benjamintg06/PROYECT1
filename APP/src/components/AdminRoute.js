import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser, isAdmin } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser && isAdmin ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/auth/login"></Redirect>
                )
            }
        ></Route>
    );
}
