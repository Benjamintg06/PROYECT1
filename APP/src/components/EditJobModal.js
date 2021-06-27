import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useCategory } from "../contexts/CategoryContext";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export function EditJobModal({ job, show, showModal }) {
    const { token } = useAuth();

    // Inicio variables para el envio del formulario
    const [loading, setLoading] = useState(false);

    const company = useRef();
    const location = useRef();
    const position = useRef();
    const category = useRef();
    const type = useRef();
    const description = useRef();
    const email = useRef();
    const howApply = useRef();
    // Final variables para el envio del formulario

    const { categories } = useCategory();

    const handleClose = () => showModal(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/jobs/${job.uid}/${job.poster}/${token}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { status } = response;
            const result = await response.json();
            status === 200
                ? Swal.fire({
                      title: "Succes!",
                      text: result.message,
                      icon: "success",
                      confirmButtonText: "OK",
                  })
                : Swal.fire({
                      title: "Error!",
                      text: result.message,
                      icon: "error",
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
        handleClose();
    };

    const handleSubmit = async () => {
        const edit = {
            company: company.current.value,
            location: location.current.value,
            email: email.current.value,
            howApply: howApply.current.value,
            position: position.current.value,
            category: category.current.value,
            type: type.current.value,
            description: description.current.value,
            poster: job.poster,
        };

        setLoading(true);

        try {
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/jobs/${job.uid}/${job.poster}/${token}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(edit),
                }
            );
            const { status } = response;
            const result = await response.json();
            status === 200
                ? Swal.fire({
                      title: "Succes!",
                      text: "Job edited",
                      icon: "success",
                      confirmButtonText: "OK",
                  })
                : Swal.fire({
                      title: "Error!",
                      text: result.message,
                      icon: "error",
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
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Job</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form
                    onSubmit={handleSubmit}
                    className="col-12"
                    style={{
                        paddingRight: "20px",
                        paddingLeft: "20px",
                    }}
                >
                    <div className="form-group">
                        <label>Company</label>
                        <input
                            ref={company}
                            className="form-control"
                            type="text"
                            name="company"
                            required
                            defaultValue={job.company}
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            ref={location}
                            className="form-control"
                            type="text"
                            name="location"
                            required
                            defaultValue={job.location}
                        />
                    </div>
                    <div className="form-group has-feedback">
                        <label>Position</label>
                        <input
                            ref={position}
                            className="form-control"
                            type="text"
                            name="position"
                            required
                            defaultValue={job.position}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            ref={category}
                            className="form-control"
                            name="category"
                            required
                            defaultValue={job.category}
                        >
                            {categories.map((item) => (
                                <option value={item.uid} key={item.uid}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select
                            ref={type}
                            className="form-control"
                            name="type"
                            required
                            defaultValue={job.type}
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            ref={description}
                            className="form-control"
                            name="description"
                            rows="5"
                            required
                            defaultValue={job.description}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            ref={email}
                            className="form-control"
                            type="email"
                            name="email"
                            required
                            defaultValue={job.email}
                        />
                    </div>
                    <div className="form-group">
                        <label>How to apply?</label>
                        <textarea
                            ref={howApply}
                            className="form-control"
                            name="howApply"
                            rows="5"
                            required
                            defaultValue={job.howApply}
                        ></textarea>
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="danger"
                    disabled={loading}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    variant="primary"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    Save changes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
