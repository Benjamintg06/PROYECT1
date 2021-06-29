import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useCategory } from "../contexts/CategoryContext";

export function JobModal(props) {
    const job = props.job;
    const showModal = props.showModal;

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
                <form
                    className="col-12"
                    style={{
                        paddingRight: "20px",
                        paddingLeft: "20px",
                    }}
                >
                    <div className="form-group">
                        <label>URL</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="url"
                            value={job.url}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="company"
                            value={job.company}
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="location"
                            value={job.location}
                        />
                    </div>
                    <div className="form-group has-feedback">
                        <label>Position</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="position"
                            value={job.position}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="category"
                            value={categoryName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="text"
                            name="type"
                            value={job.type}
                        />
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
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            readOnly={true}
                            className="form-control"
                            type="email"
                            name="email"
                            value={job.email}
                        />
                        {/* <a href={`mailto:${job.email}`}>{job.email}</a> */}
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
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
