import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { useCategory } from "../contexts/CategoryContext";

export function CategoryForm(props) {
    const cName = useRef();
    const select = useRef();
    const cUpdateName = useRef();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(false);
    const { token } = useAuth();
    const { setCategories, categories } = useCategory();
    const categoriesOptions = () =>
        categories.map((category) => (
            <option key={category.uid} value={category.uid}>
                {category.name}
            </option>
        ));
    const selectChange = (e) => {
        setCategory(
            categories.find((item) => item.uid === select.current.value) || null
        );
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
    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        try {
            const category = {
                name: cName.current.value,
            };
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/collection/categories/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(category),
                }
            );
            const { status } = response;
            const result = await response.json();
            if (status === 200) {
                setCategories((prev) => [...prev, result]);
                Swal.fire({
                    title: "Succes!",
                    text: "Category added",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: result.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        setLoading(false);
    }
    const handleDelete = async (e) => {
        setLoading(true);

        try {
            if (!category) throw new Error("You must elect a Category");
            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/collection/categories/${category.uid}/${token}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { status } = response;
            const result = await response.json();
            if (status === 200) {
                const data = categories;
                const deletedIndex = categories.findIndex(
                    (item) => item.uid === category.uid
                );
                data.splice(deletedIndex, 1);
                setCategories([...data]);
                Swal.fire({
                    title: "Succes!",
                    text: result.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: result.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
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
    const handleEdit = async (e) => {
        setLoading(true);

        try {
            if (!category) throw new Error("You must elect a Category");

            const response = await fetch(
                `https://prueba-api-programacion-3.herokuapp.com/api/collection/categories/${category.uid}/${token}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: cUpdateName.current.value }),
                }
            );
            const { status } = response;
            const result = await response.json();
            if (status === 200) {
                const data = categories;
                const modifiedIndex = categories.findIndex(
                    (item) => item.uid === category.uid
                );
                data[modifiedIndex] = result;
                setCategories([...data]);
                Swal.fire({
                    title: "Succes!",
                    text: "Category edited",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: result.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm" style={{ maxWidth: "670px" }}>
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="p-4">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">
                                        Create a Category
                                    </h4>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            className="
            form-control form-control-user
        "
                                            type="text"
                                            placeholder="Category Name"
                                            name="name"
                                            require="true"
                                            ref={cName}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block text-white btn-user"
                                        type="submit"
                                        disable={loading.toString()}
                                    >
                                        Add Category
                                    </button>
                                </form>
                                <hr></hr>
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">
                                        Edit a Category
                                    </h4>
                                </div>
                                <form
                                    className="user"
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <div className="form-group">
                                        <label
                                            className="mb-0"
                                            htmlFor="float-input"
                                            style={{
                                                paddingBottom: "1.5rem",
                                                height: "8px",
                                                fontFamily:
                                                    "Nunito, sans-serif",
                                                fontSize: "17px",
                                            }}
                                        >
                                            Choose a Category
                                        </label>
                                        <select
                                            className="form-control"
                                            ref={select}
                                            onChange={selectChange}
                                        >
                                            <option value="">None</option>
                                            {categoriesOptions()}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="
            form-control form-control-user
        "
                                            type="text"
                                            placeholder="Category Name"
                                            name="name"
                                            ref={cUpdateName}
                                            defaultValue={category?.name || ""}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <button
                                                className="btn btn-danger btn-block text-white btn-user"
                                                type="submit"
                                                disable={loading.toString()}
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <button
                                                className="btn btn-primary btn-block text-white btn-user"
                                                type="submit"
                                                disable={loading.toString()}
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
