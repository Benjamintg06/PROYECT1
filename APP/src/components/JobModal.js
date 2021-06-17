import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useCategory } from "../contexts/CategoryContext";

export function JobModal(props) {
    const job = props.job;
    const showModal = props.showModal || false;

    const { categories } = useCategory();
    const [categoryName, setCategoryName] = useState("");

    const handleClose = () => showModal(false);
    //const handleShow = () => showModal(true);

    useEffect(() => {
        if (job.category) {
            const category = categories.find(
                (item) => item.uid === job.category
            );
            setCategoryName(category.name);
        }
    }, [categories, job]);

    return (
        <Modal show={props.show} onHide={handleClose} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Job Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div
                    className="col-12"
                    id="message"
                    style={{
                        paddingRight: "20px",
                        paddingLeft: "20px",
                    }}
                >
                    <div className="form-group has-feedback">
                        <label>Company</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="company"
                            required=""
                            value={job.company}
                        />
                    </div>
                    <div className="form-row">
                        <div className="col-12">
                            <div className="form-group has-feedback">
                                <label
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Location
                                    <input
                                        readOnly={true}
                                        className="form-control"
                                        type="text"
                                        name="location"
                                        value={job.location}
                                    />
                                </label>
                            </div>
                            <div className="form-group has-feedback">
                                <label
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Email
                                    <input
                                        readOnly={true}
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        required=""
                                        value={job.email}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>How to apply?</label>
                                <textarea
                                    className="form-control"
                                    readOnly={true}
                                    name="howApply"
                                    rows="5"
                                    value={job.howApply}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="col-12"
                    style={{
                        paddingRight: "20px",
                        paddingLeft: "20px",
                    }}
                >
                    <div className="form-group has-feedback">
                        <label>Position</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="position"
                            required=""
                            value={job.position}
                        />
                    </div>
                    <div className="form-row">
                        <div className="col-12">
                            <div className="form-group has-feedback">
                                <label
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Category
                                    <input
                                        readOnly={true}
                                        className="form-control"
                                        type="text"
                                        name="category"
                                        required=""
                                        value={categoryName}
                                    />
                                </label>
                            </div>
                            <div className="form-group has-feedback">
                                <label
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Type
                                    <input
                                        readOnly={true}
                                        className="form-control"
                                        type="text"
                                        name="type"
                                        required=""
                                        value={job.type}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    readOnly={true}
                                    name="description"
                                    rows="5"
                                    value={job.description}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
