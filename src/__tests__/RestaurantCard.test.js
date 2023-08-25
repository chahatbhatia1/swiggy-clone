import { fireEvent, render, screen } from "@testing-library/react"
import RestaurantCard from "../components/RestaurantCard"
import MOCK_DATA from "../mocks/resCardData.json"
import "@testing-library/jest-dom";


it("it should load the restaurant title", () => {
    render( <RestaurantCard resData={MOCK_DATA} /> );

    const resTitle = screen.getByText("Pandit restaurant");

    expect(resTitle).toBeInTheDocument();
});

