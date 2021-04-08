import React, { useState } from "react";

function FormInput({
    name,
    label,
    input = { type: "text" },
    validation,
    register = () => null,
    errors = [],
}) {
    const renderInput = () => {
        switch (input.type) {
            case "radio":
                return input.options.map(({ value, additionalText }, i) => (
                    <label className="box">
                        <input
                            name={name}
                            id={value}
                            value={value}
                            type={input.type}
                            {...register(name, validation)}
                        />
                        {value}
                        {additionalText ? (
                            <textarea
                                className="textarea is-primary is-small has-fixed-size"
                                name={name}
                                placeholder="Please explain"
                                {...register(name + "_" + value)}
                            />
                        ) : null}
                    </label>
                ));
            case "number":
                return (
                    <input
                        className="input is-primary"
                        name={name}
                        type={input.type}
                        min={input.min}
                        max={input.max}
                        {...register(name, validation)}
                    />
                );
            default:
                return (
                    <textarea
                        className="textarea is-primary is-small has-fixed-size"
                        name={name}
                        type={input.type}
                        {...register(name, validation)}
                    />
                );
        }
    };

    return (
        <div className="box">
            <label>
                <p className="content">{label}</p>
                <span>{renderInput()}</span>
                <span>{errors[name] && "This is required"}</span>
            </label>
        </div>
    );
}

export default FormInput;
