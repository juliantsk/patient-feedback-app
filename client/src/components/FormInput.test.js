import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormInput from "./FormInput";

describe("Takes in question details and produces form input", () => {
    test("Renders variable text.", () => {
        render(<FormInput name="01" label="Question" />);
        expect(screen.getByText(/question/i)).toBeInTheDocument();
    });
    test("Renders multiple radio button.", () => {
        render(
            <FormInput
                name="01"
                label="Question"
                input={{
                    type: "radio",
                    options: [{ value: "Yes" }, { value: "No" }],
                }}
            />
        );
        expect(screen.getByText(/yes/i)).toBeInTheDocument();
        expect(screen.getByText(/no/i)).toBeInTheDocument();
    });
});
