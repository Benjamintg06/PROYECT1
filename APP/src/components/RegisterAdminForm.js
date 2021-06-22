import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

export function RegisterAdminForm(props) {
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        try {
            if (password.current.value !== confirmPassword.current.value) {
                return Swal.fire({
                    title: "Error!",
                    text: "Passwords do not match",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            if (password.current.value.length < 6) {
                return Swal.fire({
                    title: "Error!",
                    text: "The password must be 6 characters or more",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            const admin = {
                displayName: `${firstName.current.value} ${lastName.current.value}`,
                email: email.current.value,
                password: password.current.value,
            };
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/auth/admin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(admin),
                }
            );
            const { status } = response;
            const result = await response.json();
            if (status === 200) {
                Swal.fire({
                    title: "Succes!",
                    text: "Admin user created",
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
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm" style={{ maxWidth: "670px" }}>
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="p-4">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">
                                        Create an Admin
                                    </h4>
                                </div>{" "}
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                className="
                form-control
                form-control-user
            "
                                                type="text"
                                                id="exampleFirstName"
                                                placeholder="First Name"
                                                name="first_name"
                                                ref={firstName}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                className="
                form-control
                form-control-user
            "
                                                type="text"
                                                id="examplelASTName"
                                                placeholder="Last Name"
                                                name="last_name"
                                                ref={lastName}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="
            form-control form-control-user
        "
                                            type="email"
                                            id="exampleInputEmail"
                                            aria-describedby="emailHelp"
                                            placeholder="Email Address"
                                            name="email"
                                            ref={email}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                className="
                form-control
                form-control-user
            "
                                                type="password"
                                                id="examplePasswordInput"
                                                placeholder="Password"
                                                name="password"
                                                ref={password}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                className="
                form-control
                form-control-user
            "
                                                type="password"
                                                id="exampleRepeatPasswordInput"
                                                placeholder="Repeat Password"
                                                name="password_repeat"
                                                ref={confirmPassword}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block text-white btn-user"
                                        type="submit"
                                        disable={loading.toString()}
                                    >
                                        Register Account
                                    </button>
                                    <hr />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
