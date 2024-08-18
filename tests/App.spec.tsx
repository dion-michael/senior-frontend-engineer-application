import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  test("renders heading", async () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Hello world!" })).toBeInTheDocument();
  });

  test("renders a button", async () => {
    render(<App />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(1);
  });
});