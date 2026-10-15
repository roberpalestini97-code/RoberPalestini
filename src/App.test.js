import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the CV name on the home page", () => {
  render(<App />);
  expect(screen.getAllByText(/Roberto Palestini/i).length).toBeGreaterThan(0);
});
