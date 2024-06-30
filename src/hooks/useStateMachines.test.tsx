import { act, renderHook } from "@testing-library/react";
import { useStateMachines, MachineConfig } from "../hooks/useStateMachines";

const onenterMock = vi.fn();
const onexitMock = vi.fn();
const idleOnEnterMock = vi.fn();
const actionMock = vi.fn();

describe("useStateMachines", () => {
  const machineConfig: MachineConfig = {
    initialState: "idle",
    idle: {
      actions: {
        onEnter: idleOnEnterMock,
        onExit: vi.fn(),
      },
      transitions: {
        switch: {
          target: "running",
          action: actionMock,
        },
      },
    },
    running: {
      actions: {
        onEnter: onenterMock,
        onExit: onexitMock,
      },
      transitions: {
        switch: {
          target: "idle",
          action: vi.fn(),
        },
      },
    },
  };

  it("should initialize with the initial state", () => {
    const { result } = renderHook(() => useStateMachines(machineConfig));
    expect(result.current.state).toBe("idle");
  });

  it("should transition to the target state when an action is triggered", () => {
    const { result, rerender } = renderHook(() => useStateMachines(machineConfig));
    expect(result.current.state).toBe("idle");
    act(() => result.current.transition());
    rerender();
    expect(result.current.state).toBe("running");
    act(() => result.current.transition());
    rerender();
    expect(result.current.state).toBe("idle");
  });

  it("should call the onEnter and onExit actions when transitioning between states", () => {
    const { result, rerender } = renderHook(() => useStateMachines(machineConfig));
    expect(result.current.state).toBe("idle");
    act(() => result.current.transition());
    rerender();
    expect(onenterMock).toHaveBeenCalled();
    act(() => result.current.transition());
    rerender();
    expect(onexitMock).toHaveBeenCalled();
  });

  it("should call the onEnter on the first render", () => {
    const { result } = renderHook(() => useStateMachines(machineConfig));
    expect(result.current.state).toBe("idle");
    expect(idleOnEnterMock).toHaveBeenCalled();
  });

  it("should call the action when transitioning between states", () => {
    const { result, rerender } = renderHook(() => useStateMachines(machineConfig));
    expect(result.current.state).toBe("idle");
    act(() => result.current.transition());
    rerender();
    expect(actionMock).toHaveBeenCalled();
  });
});
