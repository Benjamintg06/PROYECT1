import React from "react";
import { Link } from "react-router-dom";

export function Navbar(props) {
    const toggle = (e) => {
        document.getElementById("sidebar").classList.toggle("toggled");
    };
    return (
        <nav
            className="
    navbar navbar-light navbar-expand
    bg-white
    shadow
    mb-4
    topbar
    static-top
"
            id="navbar"
        >
            <div className="container-fluid">
                <button
                    className="
            btn btn-link
            d-md-none
            rounded-circle
            mr-3
        "
                    id="sidebarToggleTop"
                    type="button"
                    onClick={toggle}
                >
                    <i className="fas fa-bars"></i>
                </button>
                <Link
                    className="
            navbar-brand
            d-flex
            justify-content-center
            align-items-center
            sidebar-brand
            m-0
        "
                    to="/"
                    style={{
                        color: "rgb(78, 115, 223)",
                        margin: "0px",
                        padding: "0",
                        height: "26px",
                        width: "1000px",
                    }}
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-briefcase"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <span>GET A JOB</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
