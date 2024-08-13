import { render, screen } from "@testing-library/react";
import App from "../App";

describe("User", () => {
  test("renders heading", async () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Hello world!" })).toBeInTheDocument();
  });

  test("renders a button", async () => {
    render(<App />);
    const users = await screen.findAllByRole("button");
    expect(users).toHaveLength(1);
  });
});