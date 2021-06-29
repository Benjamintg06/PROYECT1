import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function RegisterForm(props) {
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const company = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [option, setOption] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password.current.value !== passwordConfirm.current.value) {
            return setError("Passwords do not match");
        }
        if (password.current.value.length < 6) {
            return setError("The password must be 6 characters or more");
        }
        try {
            setError("");
            setLoading(true);
            const user = {
                displayName: `${firstName.current.value} ${lastName.current.value}`,
                email: email.current.value,
                password: password.current.value,
                company: company.current ? company.current.value : "",
            };
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            const { status } = response;
            const result = await response.json();
            if (status === 200) {
                await login(user.email, user.password);
            } else {
                throw new Error(result.message);
            }
            setLoading(false);
            history.push("/");
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="row">
            <div className="col-lg-5 d-none d-lg-flex">
                <div
                    className="flex-grow-1 bg-register-image"
                    style={{
                        backgroundImage:
                            "url('/assets/img/informe-conexiones.png?h=a85f36d71cfac2049655ec256f1fa73d')",
                    }}
                ></div>
            </div>
            <div className="col-lg-7">
                <div
                    className="p-5"
                    style={{
                        padding: "1rem !important",
                    }}
                >
                    <div className="text-center">
                        <h4 className="text-dark mb-4">Create an Account!</h4>
                    </div>{" "}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
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
                                    ref={passwordConfirm}
                                />
                            </div>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                onChange={(e) => setOption(e.target.checked)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckDefault"
                            >
                                Are you a company user?
                            </label>
                        </div>
                        {option && (
                            <div className="form-group ">
                                <input
                                    className="
            form-control form-control-user
        "
                                    type="text"
                                    placeholder="Company name"
                                    name="company"
                                    ref={company}
                                    required
                                />
                            </div>
                        )}
                        <button
                            className="btn btn-primary btn-block text-white btn-user"
                            type="submit"
                            disable={loading.toString()}
                        >
                            Register Account
                        </button>
                        <hr />
                    </form>
                    <div className="text-center">
                        <Link className="small" to="/auth/login">
                            Already have an account? Login!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
