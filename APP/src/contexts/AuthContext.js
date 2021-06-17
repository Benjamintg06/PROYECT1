import React, { useContext, useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function singup(email, password) {
        return projectAuth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return projectAuth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return projectAuth.signOut();
    }

    function resetPassword(email) {
        return projectAuth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsusribe = projectAuth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsusribe;
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        singup,
        login,
        logout,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
