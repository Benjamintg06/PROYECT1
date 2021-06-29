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
    const [userCompany, setUserCompany] = useState("");
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
        const unsusribe = projectAuth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const idTokenResult = await user.getIdTokenResult();
                    setToken(idTokenResult.token);
                    setIsAdmin(idTokenResult.claims.admin);
                    setUserCompany(idTokenResult.claims.company);
                } catch (error) {
                    setToken(null);
                    setIsAdmin(false);
                    setUserCompany("");
                }
            } else {
                setToken(null);
                setIsAdmin(false);
                setUserCompany("");
            }
            setCurrentUser(user);
            setLoading(false);
        });
        return unsusribe;
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.photoURL) {
            const ramdon = Date.now();
            setImage(
                `https://storage.googleapis.com/proyectofinalpw-d35e3.appspot.com/${currentUser.uid}?${ramdon}`
            );
        } else {
            setImage(null);
        }
    }, [currentUser]);

    const value = {
        isAdmin,
        token,
        userCompany,
        image,
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
