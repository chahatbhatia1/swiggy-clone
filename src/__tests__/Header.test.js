import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../components/Header"
import { Provider } from "react-redux";
import appStore from "../utils/appStore"
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


it("it should load the login button in the header component", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>    
        </BrowserRouter>
    );

    // Specific button with name "Login"
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(loginButton).toBeInTheDocument();
})

it("it should load cart item in the header component", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>    
        </BrowserRouter>
    );

    // RegEx can also be used for query
    const cartItem = screen.getByText(/Cart/);

    expect(cartItem).toBeInTheDocument();
})

it("it should change the login button to logout on click", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>    
        </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: "Logout" });

    expect(logoutButton).toBeInTheDocument();
})