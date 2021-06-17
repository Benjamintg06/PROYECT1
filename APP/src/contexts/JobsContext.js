import React, { useContext, useState, useEffect } from "react";

const JobsContext = React.createContext();

export function useJobs() {
    return useContext(JobsContext);
}

export function JobsProvider({ children }) {
    const [jobs, setJobs] = useState([]);

    const value = {
        jobs,
    };

    useEffect(() => {
        const socket = new WebSocket(
            "wss://prueba-api-programacion-3.herokuapp.com"
        );
        const data = [];

        socket.onmessage = function (event) {
            const message = JSON.parse(event.data);
            message.forEach((change) => {
                const { type, document } = change;

                switch (type) {
                    case "added":
                        data.unshift(document);
                        break;

                    case "modified":
                        const modifiedIndex = data.findIndex(
                            (item) => item.uid === document.uid
                        );
                        data[modifiedIndex] = document;
                        break;

                    case "removed":
                        const deletedIndex = data.findIndex(
                            (item) => item.uid === document.uid
                        );
                        data.splice(deletedIndex, 1);
                        break;
                    default:
                        break;
                }
            });
            setJobs([...data]);
        };
    }, []);

    return (
        <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
    );
}
