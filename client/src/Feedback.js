import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "./components/FormInput";

function Feedback({ patientData, questionList, response, onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="column is-half">
            <h1 className="title">Patient Feedback</h1>
            <h2 className="subtitle">
                {patientData.appointment.text + " "}
                {patientData.appointment.date
                    ? " on " + patientData.appointment.date
                    : null}
            </h2>
            {!response ? (
                <form className="block" onSubmit={handleSubmit(onSubmit)}>
                    {questionList.map(({ id, text, input, validation }) => (
                        <FormInput
                            name={id}
                            key={id}
                            label={text}
                            {...{ input, validation, register, errors }}
                        />
                    ))}
                    <input
                        className="button is-primary is-large"
                        type="submit"
                    />
                </form>
            ) : (
                <div className="box">
                    <p className="content is-medium">
                        Thanks again! Here's what we heard:
                    </p>
                    {Object.entries(response).map((item) => (
                        <p className="content is-medium">{item[1]}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Feedback;
