import React, { useState, useEffect } from "react";
import Feedback from "./Feedback";
import { processPatientData, processQuestionList } from "./utils/processJson";

function App() {
    const [patientData, setPatientData] = useState("");
    const [questionList, setQuestionList] = useState("");
    const [response, setResponse] = useState("");

    useEffect(() => {
        fetch("/api/patient")
            .then((res) => res.json())
            .then((res) => setPatientData(processPatientData(res)));
    }, [setPatientData]);

    useEffect(() => {
        patientData &&
            fetch("/api/feedback/question")
                .then((response) => response.json())
                .then((res) =>
                    setQuestionList(processQuestionList(patientData, res))
                );
    }, [setQuestionList, patientData]);

    const onSubmit = (data) => {
        setResponse(
            Object.keys(data)
                .filter((key) => key.indexOf("_") < 0)
                .map((key) =>
                    data[key + "_" + data[key]]
                        ? data[key] + ", " + data[key + "_" + data[key]]
                        : data[key]
                )
        );
            fetch("/api/feedback/answer", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error("Error:", err));
    };

    return patientData && questionList ? (
        <div className="columns is-centered has-background-light"> 
        <Feedback {...{ patientData, questionList, response, onSubmit }} />
</div>
    ) : null;
}

export default App;
