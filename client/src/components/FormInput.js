import React from "react";

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
                    <>
                        <input
                            name={name}
                            id={value}
                            value={value}
                            type={input.type}
                            {...register(name, validation)}
                        />
                        {value}
                        {additionalText ? (
                            <input
                                name={name}
                                {...register(name + "_" + value)}
                            />
                        ) : null}
                    </>
                ));
            case "number":
                return (
                    <input
                        name={name}
                        type={input.type}
                        min={input.min}
                        max={input.max}
                        {...register(name, validation)}
                    />
                );
            default:
                return (
                    <input
                        name={name}
                        type={input.type}
                        {...register(name, validation)}
                    />
                );
        }
    };

    return (
        <label>
            <span>{label}</span>
            <span>{renderInput()}</span>
            <span>{errors[name] && "This is required"}</span>
        </label>
    );
}

export default FormInput;
