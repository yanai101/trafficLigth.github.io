import { useEffect, useState } from "react";

interface Action {
  (): void;
}

interface Actions {
  onEnter: Action;
  onExit: Action;
}

interface Transition {
  target: string;
  action: Action;
}

interface State {
  actions: Actions;
  transitions: {
    [key: string]: Transition;
  };
}

export interface MachineConfig {
  initialState: string;
  [key: string]: State | string;
}

// interface MachineConfig {
//   initialState: string;
//   [key: string]: {
//     actions: {
//       onEnter: () => void;
//       onExit: () => void;
//     };
//     transitions: {
//       [key: string]: {
//         target: string;
//         action: () => void;
//       };
//     };
//   };
// }

export const useStateMachines = (machineConfig: MachineConfig) => {
  const [state, setState] = useState<string>(machineConfig.initialState);

  useEffect(() => {
    if (machineConfig.initialState) {
      const action = (machineConfig[machineConfig.initialState] as State)?.actions;
      if (action.onEnter) {
        action.onEnter();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transition = () => {
    const currentState = machineConfig[state];
    const transition = (machineConfig[state] as State)?.transitions["switch"];

    if (!transition) {
      console.error(`No transition found for "switch" in state: ${currentState}`);
      return;
    }

    (currentState as State).actions.onExit();
    transition.action();
    setState(transition.target);
    (machineConfig[transition.target] as State).actions.onEnter();
  };

  return { state, transition };
};
