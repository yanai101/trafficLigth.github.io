import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderWithUserEvent = (jsx: React.ReactNode): any => {
  return { user: userEvent.setup(), ...render(jsx) };
};
