import React, { useState, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { ProfileTable } from "../components/ProfileTable";

export function Profile(props) {
    const { currentUser, setCurrentUser, token } = useAuth();

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const profileForm = useRef();
    const displayName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const photo = useRef();

    const sendForm = () => {
        const formData = new FormData();
        formData.append("uid", currentUser.uid);
        if (displayName.current.value) {
            formData.append("displayName", displayName.current.value);
        }
        if (email.current.value) {
            formData.append("email", email.current.value);
        }
        if (password.current.value) {
            formData.append("password", password.current.value);
        }
        if (file) {
            formData.append("logo", file, file.name);
        }
        return formData;
    };

    const handleChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
        if (newFile) {
            const objectURL = URL.createObjectURL(newFile);
            photo.current.src = objectURL;
        }
        sendForm();
    };

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
                //`https://prueba-api-programacion-3.herokuapp.com/api/user/${currentUser.uid}/${token}`,
                `http://localhost:5050/api/user/${currentUser.uid}/${token}`,
                {
                    method: "PUT",
                    // headers: {
                    //     "Content-Type": "application/json",
                    // },
                    // body: JSON.stringify(user),
                    body: sendForm(),
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
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="card mb-3">
                                    <div className="card-body text-center shadow">
                                        <img
                                            ref={photo}
                                            alt="Profile"
                                            className="rounded-circle mb-3 mt-4"
                                            src={
                                                currentUser.photoURL ||
                                                "assets/img/avatars/image.png"
                                            }
                                            width="160"
                                            height="160"
                                        />
                                        <div className="mb-3">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    onChange={handleChange}
                                                />
                                                <label
                                                    className="custom-file-label"
                                                    htmlFor="customFile"
                                                >
                                                    {file?.name ||
                                                        "Choose file"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
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
                                                <form
                                                    onSubmit={handleSubmit}
                                                    ref={profileForm}
                                                >
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
                                                                    name="displayName"
                                                                    type="text"
                                                                    placeholder={
                                                                        currentUser.displayName
                                                                    }
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
                                                                    name="email"
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
                                                                    name="password"
                                                                    type="password"
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
                    <ProfileTable></ProfileTable>
                </div>
            </div>
        </div>
    );
}
