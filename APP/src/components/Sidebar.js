import React, { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Sidebar(props) {
    const sideBar = useRef(null);
    const { logout, currentUser, isAdmin } = useAuth();
    const history = useHistory();

    async function handleLogOut() {
        await logout();
        history.push("/");
    }

    const toggle = (e) => {
        sideBar.current.classList.toggle("toggled");
    };

    return (
        <nav
            className="
    navbar navbar-dark
    align-items-start
    sidebar sidebar-dark
    accordion
    bg-gradient-primary
    p-0
    toggled
"
            ref={sideBar}
            id="sidebar"
            style={{ width: "233px" }}
        >
            <div className="container-fluid d-flex flex-column p-0">
                <div
                    className="
            navbar-brand
            d-flex
            justify-content-center
            align-items-center
            sidebar-brand
            m-0
        "
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-briefcase"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <span>Menu</span>
                    </div>
                </div>
                <hr className="sidebar-divider my-0" />
                <ul className="nav navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item" role="presentation">
                        <NavLink
                            className="nav-link"
                            exact
                            to="/"
                            activeClassName="active"
                        >
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    {currentUser && (
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                exact
                                to="/profile"
                                activeClassName="active"
                            >
                                <i className="fas fa-user-cog"></i>
                                <span>Profile</span>
                            </NavLink>
                        </li>
                    )}
                    {isAdmin && (
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                exact
                                to="/admin"
                                activeClassName="active"
                            >
                                <i className="fas fa-tools"></i>
                                <span>Admin</span>
                            </NavLink>
                        </li>
                    )}
                    {currentUser ? (
                        <li
                            className="nav-item"
                            role="presentation"
                            onClick={handleLogOut}
                        >
                            <div className="nav-link">
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </div>
                        </li>
                    ) : (
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                exact
                                to="/auth/login"
                            >
                                <i className="fas fa-sign-in-alt"></i>
                                <span>Login</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="text-center d-none d-md-inline">
                    <button
                        className="btn rounded-circle border-0"
                        id="sidebarToggle"
                        type="button"
                        onClick={toggle}
                    ></button>
                </div>
            </div>
        </nav>
    );
}
