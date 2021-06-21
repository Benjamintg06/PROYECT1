import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Table } from "../components/Table";

export function Index(props) {
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
                        </div>
                    </div>
                    {/* <div className="container-fluid">
                        <form>
                            <div className="field">
                                <select
                                    className="form-control"
                                    style={{
                                        padding: 0,
                                        width: "100%",
                                        maxWidth: " 400px",
                                        height: "38px",
                                    }}
                                    id="categories"
                                    ref={select}
                                    onChange={selectChange}
                                >
                                    <option value="">All</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.uid}
                                            value={category.uid}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    className="mb-0"
                                    htmlFor="float-input"
                                    style={{
                                        paddingBottom: "1.5rem",
                                        height: "8px",
                                        width: " 1029px",
                                        color: " rgb(0, 0, 0)",
                                        fontFamily: "Nunito, sans-serif",
                                        fontSize: "17px",
                                    }}
                                >
                                    Choose a Category
                                </label>
                            </div>
                        </form>
                    </div>
                    <div
                        className="container-fluid"
                        style={{ marginBottom: "1.5rem" }}
                    >
                        <MDBDataTableV5
                            hover
                            entriesOptions={[5, 15, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={dataTable}
                            pagingTop
                            searchTop
                            searchBottom={false}
                            barReverse
                            fullPagination
                            responsive={true}
                        />
                        <JobModal
                            job={job}
                            showModal={setShowModal}
                            show={showModal}
                        ></JobModal>
                    </div>*/}
                    <Table></Table>
                </div>
            </div>
        </div>
    );
}
