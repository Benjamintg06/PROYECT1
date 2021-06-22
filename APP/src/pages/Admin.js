import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { AdminTable } from "../components/AdminTable";
import { RegisterAdminForm } from "../components/RegisterAdminForm";

export function Admin(props) {
    return (
        <div id="wrapper">
            <Sidebar></Sidebar>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <Navbar></Navbar>
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Admin</h3>
                    </div>
                    <AdminTable></AdminTable>
                    <RegisterAdminForm></RegisterAdminForm>
                </div>
            </div>
        </div>
    );
}
