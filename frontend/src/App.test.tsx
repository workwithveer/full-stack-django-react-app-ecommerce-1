import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";


test("render app component", async () => {
  render(<App />);

  // Wait for the component to render and find the heading
  await waitFor(() => {
    expect(
      screen.getByText("Welcome to Our E-Commerce Store")
    ).toBeInTheDocument();
  });
});
