import React, { useState, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export function Profile(props) {
    const { currentUser, setCurrentUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const displayName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (
                password.current.value !== "" ||
                confirmPassword.current.value !== ""
            ) {
                if (password.current.value !== confirmPassword.current.value) {
                    throw new Error("The passwords don't match");
                } else if (password.current.value.length < 6) {
                    throw new Error(
                        "The password must be 6 characters or more"
                    );
                }
            }
            const user = {
                uid: currentUser.uid,
                displayName: displayName.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            Object.keys(user).forEach((key) => {
                if (!user[key]) delete user[key];
            });
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/user/${currentUser.uid}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            const { status } = response;
            const result = await response.json();
            if (status === 200) {
                setCurrentUser(result);
                Swal.fire({
                    title: "Succes!",
                    text: "Profile modified",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: result.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        setLoading(false);
    };

    return (
        <div id="wrapper">
            <Sidebar></Sidebar>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <Navbar></Navbar>
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Profile</h3>
                        <div className="row mb-3" style={{ width: "100%" }}>
                            <div className="col-lg-8" style={{ width: "100%" }}>
                                <div className="row" style={{ width: "100%" }}>
                                    <div className="col">
                                        <div className="card shadow mb-3">
                                            <div className="card-header py-3">
                                                <p
                                                    className="
                                                        text-primary
                                                        m-0
                                                        font-weight-bold
                                                    "
                                                >
                                                    Update User&nbsp;
                                                </p>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <div
                                                                className="
                                                                    form-group
                                                                "
                                                            >
                                                                <label htmlFor="first_name">
                                                                    <strong>
                                                                        User
                                                                        Name
                                                                    </strong>
                                                                </label>
                                                                <input
                                                                    ref={
                                                                        displayName
                                                                    }
                                                                    className="
                                                                        form-control
                                                                    "
                                                                    id="username"
                                                                    type="text"
                                                                    placeholder={
                                                                        currentUser.displayName
                                                                    }
                                                                    name="displayName"
                                                                />
                                                            </div>
                                                            <div
                                                                className="
                                                                    form-group
                                                                "
                                                            >
                                                                <label htmlFor="last_name">
                                                                    <strong>
                                                                        Email
                                                                    </strong>
                                                                </label>
                                                                <input
                                                                    className="
                                                                        form-control
                                                                    "
                                                                    ref={email}
                                                                    id="email"
                                                                    placeholder={
                                                                        currentUser.email
                                                                    }
                                                                    type="email"
                                                                />
                                                            </div>
                                                            <div
                                                                className="
                                                                    form-group
                                                                "
                                                            >
                                                                <label htmlFor="last_name">
                                                                    <strong>
                                                                        Password
                                                                    </strong>
                                                                </label>
                                                                <input
                                                                    className="
                                                                        form-control
                                                                    "
                                                                    ref={
                                                                        password
                                                                    }
                                                                    id="password"
                                                                    type="password"
                                                                    name="last_name"
                                                                />
                                                            </div>
                                                            <div
                                                                className="
                                                                    form-group
                                                                "
                                                            >
                                                                <label htmlFor="last_name">
                                                                    <strong>
                                                                        Repeat
                                                                        Password
                                                                    </strong>
                                                                </label>
                                                                <input
                                                                    className="
                                                                        form-control
                                                                    "
                                                                    ref={
                                                                        confirmPassword
                                                                    }
                                                                    id="PassConfirmation"
                                                                    type="password"
                                                                    name="Password"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button
                                                            className="
                                                                btn
                                                                btn-primary
                                                                btn-sm
                                                            "
                                                            id="btnprofile"
                                                            type="submit"
                                                            disabled={loading}
                                                        >
                                                            Save Settings
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
