import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "./components/FormInput";

function Feedback({ patientData, questionList, response, setResponse }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => setResponse(data);

    return (
        <>
            <h1>Patient Feedback</h1>
            <h2>
                {patientData.appointment.text + " "}
                {patientData.appointment.date
                    ? " on " + patientData.appointment.date
                    : null}
            </h2>
            {!response ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {questionList.map(({ id, text, input, validation }) => (
                        <FormInput
                            name={id}
                            key={id}
                            label={text}
                            {...{ input, validation, register, errors }}
                        />
                    ))}
                    <input type="submit" />
                </form>
            ) : (
                <div>
                    <p> Thanks again! Here's what we heard:</p>
                    {Object.entries(response).map((item) => (
                        <p>{item[1]}</p>
                    ))}
                </div>
            )}
        </>
    );
}

export default Feedback;
