import React, { useState, useEffect } from "react";
import { useJobs } from "../contexts/JobsContext";
import { useParams } from "react-router-dom";

export function Detail(props) {
    let { uid } = useParams();
    const { jobs } = useJobs();
    const [job, setJob] = useState();
    useEffect(() => {
        setJob(jobs.find((job) => job.uid === uid));
    }, [jobs, uid]);
    //<Redirect to="/somewhere/else" />
    return <div id="wrapper">{JSON.stringify(job)}</div>;
}
