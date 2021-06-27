import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { AdminTable } from "../components/AdminTable";
import { RegisterAdminForm } from "../components/RegisterAdminForm";
import { CategoryForm } from "../components/CategoryForm";

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
                    <AdminTable></AdminTable>{" "}
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Categories</h3>
                    </div>
                    <CategoryForm></CategoryForm>
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Add an Admin</h3>
                    </div>
                    <RegisterAdminForm></RegisterAdminForm>
                </div>
            </div>
        </div>
    );
}
