import React, { useState, useRef } from "react";
import { useCategory } from "../contexts/CategoryContext";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import Swal from "sweetalert2";

export function Post(props) {
    const { categories } = useCategory();

    const [loading, setLoading] = useState(false);

    const company = useRef();
    const location = useRef();
    const position = useRef();
    const category = useRef();
    const type = useRef();
    const description = useRef();
    const email = useRef();
    const howApply = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const job = {
            company: company.current.value,
            location: location.current.value,
            email: email.current.value,
            howApply: howApply.current.value,
            position: position.current.value,
            category: category.current.value,
            type: type.current.value,
            description: description.current.value,
        };

        setLoading(true);

        try {
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/jobs`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(job),
                }
            );
            const { status } = response;
            const result = await response.json();
            status === 200
                ? Swal.fire({
                      title: "Succes!",
                      text: "Job posted",
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
    };

    return (
        <div id="wrapper">
            <Sidebar></Sidebar>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <Navbar></Navbar>
                    <div className="container-fluid">
                        <h3 className="text-dark mb-1">Postear un Empleo</h3>
                    </div>

                    <section
                        id="contact"
                        style={{
                            padding: " 40px",
                            paddingRight: "5px",
                            paddingLeft: "4px",
                        }}
                    >
                        <div className="container">
                            <form
                                onSubmit={handleSubmit}
                                id="contactForm"
                                style={{ padding: "15px" }}
                            >
                                <div
                                    className="form-row"
                                    style={{
                                        marginLeft: "0px",
                                        marginRight: "0px",
                                        padding: "10px",
                                    }}
                                >
                                    <div
                                        className="col-md-6"
                                        style={{
                                            paddingLeft: "20px",
                                            paddingRight: "20px",
                                        }}
                                    >
                                        <legend>
                                            <i className="fas fa-users"></i>
                                            &nbsp;Ingrese la información
                                            requerida
                                        </legend>

                                        <label htmlFor="company">Company</label>
                                        <input
                                            ref={company}
                                            className="form-control"
                                            type="text"
                                            name="company"
                                            required
                                            placeholder="Apple"
                                        />
                                        <label htmlFor="location">
                                            Location
                                        </label>

                                        <input
                                            ref={location}
                                            className="form-control"
                                            type="text"
                                            name="location"
                                            required
                                            placeholder="Santo Domingo"
                                        />
                                        <div className="form-group has-feedback">
                                            <label htmlFor="position">
                                                Position
                                            </label>
                                            <input
                                                ref={position}
                                                className="form-control"
                                                type="text"
                                                name="position"
                                                required
                                                placeholder="Gerente"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="col-12 col-md-6"
                                        id="message"
                                        style={{
                                            paddingRight: "20px",
                                            paddingLeft: "20px",
                                        }}
                                    >
                                        <div className="form-row">
                                            <div className="col-sm-6">
                                                <div
                                                    className="
                                                        htmlForm-group
                                                        has-feedback
                                                    "
                                                >
                                                    <label htmlFor="category">
                                                        Category
                                                    </label>
                                                    <select
                                                        ref={category}
                                                        className="form-control"
                                                        name="category"
                                                        required
                                                    >
                                                        {categories.map(
                                                            (item) => (
                                                                <option
                                                                    value={
                                                                        item.uid
                                                                    }
                                                                    key={
                                                                        item.uid
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="type">
                                                        Type
                                                    </label>
                                                    <select
                                                        ref={type}
                                                        className="form-control"
                                                        name="type"
                                                        required
                                                    >
                                                        <option value="Full Time">
                                                            Full Time
                                                        </option>
                                                        <option value="Part Time">
                                                            Part Time
                                                        </option>
                                                        <option value="Freelance">
                                                            Freelance
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">
                                                Description
                                            </label>
                                            <textarea
                                                ref={description}
                                                className="form-control"
                                                name="description"
                                                placeholder="What is the job like?"
                                                rows="5"
                                            ></textarea>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                ref={email}
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="example@gmail.com"
                                            />
                                            <label htmlFor="howApply">
                                                How to apply?
                                            </label>
                                            <textarea
                                                ref={howApply}
                                                className="form-control"
                                                name="howApply"
                                                id="howApply"
                                                placeholder="Envie su cv a.."
                                                rows="5"
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="form-group">
                                            <div
                                                className="
                                                    btn
                                                    btn-success
                                                    btn-icon-split
                                                "
                                                role="button"
                                                id="btnpost"
                                                style={{ width: "100%" }}
                                            >
                                                <span className="text-white-50 icon">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                                <button
                                                    type="submit"
                                                    className="text-white text btn"
                                                    style={{ width: "100%" }}
                                                    disabled={loading}
                                                >
                                                    Subir Empleo
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
                <footer className="bg-white sticky-footer">
                    <div className="container my-auto">
                        <div className="text-center my-auto copyright">
                            <span>Copyright ©Grupo12</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
