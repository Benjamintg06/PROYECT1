import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export function ResetForm(props) {
    const email = useRef();
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await resetPassword(email.current.value);
            Swal.fire({
                title: "Success!",
                text: "Check your inbox for further instructions",
                icon: "success",
                confirmButtonText: "OK",
            });
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
                        <h4 className="text-dark mb-4">Reset Password</h4>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
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
                        <button
                            className="
                                            btn btn-primary btn-block
                                            text-white
                                            btn-user
                                        "
                            type="submit"
                            disable={loading}
                        >
                            Submit
                        </button>
                        <hr />
                    </form>
                    <div className="text-center">
                        <Link className="small" to="/auth/login">
                            Already have an account? Login!
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
