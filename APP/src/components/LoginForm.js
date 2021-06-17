import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function LoginForm(props) {
    const form = useRef(null);
    const email = useRef();
    const password = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(email.current.value, password.current.value);
            setLoading(false);
            history.push("/");
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    return (
        <div className="row">
            <div className="col-lg-6 d-none d-lg-flex">
                <div
                    className="flex-grow-1 bg-login-image"
                    style={{
                        backgroundImage:
                            "url('/assets/img/informe-conexiones.png?h=a85f36d71cfac2049655ec256f1fa73d')",
                    }}
                ></div>
            </div>
            <div className="col-lg-6">
                <div
                    className="p-5"
                    style={{
                        padding: " 1rem !important",
                    }}
                >
                    <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                    </div>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form className="user" ref={form} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                className="
                                                form-control
                                                form-control-user
                                            "
                                type="email"
                                id="exampleInputEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter Email Address..."
                                name="email"
                                ref={email}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="
                                                form-control
                                                form-control-user
                                            "
                                type="password"
                                id="exampleInputPassword"
                                placeholder="Password"
                                name="password"
                                ref={password}
                            />
                        </div>
                        <button
                            className="
                                            btn btn-primary btn-block
                                            text-white
                                            btn-user
                                        "
                            type="submit"
                            disable={loading}
                        >
                            Login
                        </button>
                        <hr />
                    </form>
                    <div className="text-center">
                        <Link className="small" to="/auth/forgotpassword">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link className="small" to="/auth/register">
                            Create an Account!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
