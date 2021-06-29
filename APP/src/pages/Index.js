import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Table } from "../components/Table";
import { useAuth } from "../contexts/AuthContext";

export function Index(props) {
    const { userCompany, isAdmin } = useAuth();

    return (
        <div id="wrapper">
            <Sidebar></Sidebar>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <Navbar></Navbar>
                    <div className="container-fluid">
                        <div
                            className="
                        d-sm-flex
                        justify-content-between
                        align-items-center
                        mb-4
                    "
                        >
                            {(userCompany || isAdmin) && (
                                <Link
                                    to="/upload"
                                    className="
                            btn btn-primary btn-sm
                             d-sm-inline-block
                        "
                                    role="button"
                                    href="/Empleador.html"
                                >
                                    Post a Job
                                </Link>
                            )}
                        </div>
                    </div>
                    <Table></Table>
                </div>
            </div>
        </div>
    );
}
