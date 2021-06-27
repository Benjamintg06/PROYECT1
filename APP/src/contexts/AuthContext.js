import React, { useContext, useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const [image, setImage] = useState(null);

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
            if (user) {
                user.getIdToken()
                    .then((token) => setToken(token))
                    .catch((error) => setToken(null));
                user.getIdTokenResult()
                    .then((idTokenResult) => {
                        setIsAdmin(idTokenResult.claims.admin);
                    })
                    .catch((error) => {
                        setIsAdmin(false);
                    });
            } else {
                setToken(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return unsusribe;
    }, []);

    useEffect(() => {
        if (currentUser) {
            const ramdon = Date.now();
            setImage(
                `https://storage.googleapis.com/proyectofinalpw-d35e3.appspot.com/${currentUser.uid}?${ramdon}`
            );
        }
    }, [currentUser]);

    const value = {
        isAdmin,
        token,
        currentUser,
        image,
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
