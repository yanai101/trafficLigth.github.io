import { render, screen } from "@testing-library/react";
import App from "./App";
import { renderWithUserEvent } from "./test/utils";

describe("traffic Light State-Machine App", () => {
  test("renders app component", () => {
    render(<App />);
    const appElement = screen.getByText(/Traffic Light State-Machine/i);
    expect(appElement).toBeInTheDocument();
  });

  test("renders red light on start", () => {
    const { container } = render(<App />);
    const redLight = screen.getByTestId("stop");
    expect(redLight).toBeInTheDocument();
    const activeLight = container.querySelector('[data-active="active"]');
    expect(activeLight).toHaveClass("red");
  });

  test("renders yellow-green-red light on switch", async () => {
    const { user, container } = renderWithUserEvent(<App />);
    const switchButton = screen.getByText(/switch/i);
    let activeLight = container.querySelector('[data-active="active"]');

    const redLight = screen.getByTestId("stop");
    expect(redLight).toBeInTheDocument();
    expect(activeLight).toHaveClass("red");

    await user.click(switchButton);

    const yellowLight = screen.getByTestId("wait");
    expect(yellowLight).toBeInTheDocument();
    activeLight = container.querySelector('[data-active="active"]');
    expect(activeLight).toHaveClass("yellow");
    await user.click(switchButton);

    const greenLight = screen.getByTestId("go");
    expect(greenLight).toBeInTheDocument();
    activeLight = container.querySelector('[data-active="active"]');
    expect(activeLight).toHaveClass("green");
  });
});
