import React, { useState, useEffect, useRef } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useJobs } from "../contexts/JobsContext";
import { useCategory } from "../contexts/CategoryContext";
import { JobModal } from "../components/JobModal";

export function Table(props) {
    const { jobs } = useJobs();
    const { categories } = useCategory();

    const categoriesOptions = () =>
        categories.map((category) => (
            <option key={category.uid} value={category.uid}>
                {category.name}
            </option>
        ));

    const [dataTable, setDataTable] = useState({ columns: [], rows: [] });
    const [categoryID, setCategoryID] = useState("");
    const [job, setJob] = useState({});
    const [showModal, setShowModal] = useState(false);

    const select = useRef(null);

    const selectChange = (e) => {
        setCategoryID(select.current.value);
    };

    const rowClick = (job) => {
        setJob(job);
        setShowModal(true);
    };
    useEffect(() => {
        categories.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    }, [categories]);
    useEffect(() => {
        const columns = [
            {
                label: "Location",
                field: "location",
            },
            {
                label: "Position",
                field: "position",
            },
            {
                label: "Company",
                field: "company",
            },
        ];
        setDataTable({
            columns: columns,
            rows: jobs
                .filter((job) => job.category.includes(categoryID))
                .map((job) => ({
                    location: job.location,
                    position: job.position,
                    company: job.company,
                    clickEvent: () => rowClick(job),
                })),
        });
    }, [jobs, categoryID]);

    return (
        <>
            <div className="container-fluid">
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
                            {categoriesOptions()}
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
            <div className="container-fluid" style={{ marginBottom: "1.5rem" }}>
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
            </div>
        </>
    );
}
