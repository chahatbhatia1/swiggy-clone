import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import Contact from "../components/Contact"

describe("Contact Component Test cases", () => {
    it("Should load button inside Contact component", () => {
        render(<Contact />);
    
        // Querying
        const button = screen.getByRole("button");
    
        // Assertion
        expect(button).toBeInTheDocument();
    })
    
    it("Should load name input inside Contact component", () => {
        render(<Contact />);
    
        // Querying
        const nameInput = screen.getByPlaceholderText("Enter your name");
    
        // Assertion
        expect(nameInput).toBeInTheDocument();
    })
    
    it("Should load two input boxes inside Contact component", () => {
        render(<Contact />);
    
        const inputs = screen.getAllByRole("textbox");
    
        // Assertion
        expect(inputs.length).toBe(2);
    })
})

