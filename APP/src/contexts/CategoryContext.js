import React, { useContext, useState, useEffect } from "react";

const CategoryContext = React.createContext();

export function useCategory() {
    return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);

    const value = {
        categories,
        setCategories,
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch(
                    `https://prueba-api-programacion-3.herokuapp.com/api/collection/categories`,
                    {
                        method: "GET",
                    }
                );
                setCategories(await response.json());
            } catch (error) {
                setCategories((prev) => prev);
            }
        };
        getCategories();
        return getCategories;
    }, []);

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}
