import { useState } from "react";
import "./App.css";
import { MachineConfig, useStateMachines } from "./hooks/useStateMachines";
import { BsSignStop } from "react-icons/bs";
import { FaWalking } from "react-icons/fa";
import { GiTrafficLightsReadyToGo } from "react-icons/gi";

const machineConfig = (updateState: React.Dispatch<React.SetStateAction<string | JSX.Element>>): MachineConfig => ({
  initialState: "red",
  red: {
    actions: {
      onEnter() {
        updateState(<BsSignStop fontSize={60} color="red" data-testid="stop" />);
      },
      onExit() {
        updateState("red exit");
      },
    },
    transitions: {
      switch: {
        target: "yellow",
        action() {
          console.log('transition action for "switch" in "red" state');
        },
      },
    },
  },
  green: {
    actions: {
      onEnter() {
        updateState(<FaWalking fontSize={60} color="green" data-testid="go" />);
      },
      onExit() {
        updateState("green exit");
      },
    },
    transitions: {
      switch: {
        target: "red",
        action() {
          console.log('transition action for "switch" in "green" state');
        },
      },
    },
  },
  yellow: {
    actions: {
      onEnter() {
        updateState(<GiTrafficLightsReadyToGo fontSize={60} color="yellow" data-testid="wait" />);
      },
      onExit() {
        updateState("yellow exit");
      },
    },
    transitions: {
      switch: {
        target: "green",
        action() {
          console.log('transition action for "switch" in "yellow" state');
        },
      },
    },
  },
});

function App() {
  const [response, setResponse] = useState<string | JSX.Element>("");
  const { state, transition } = useStateMachines(machineConfig(setResponse));

  const isActive = (stateName: string) => (state === stateName ? "active" : "");

  const doTransition = () => {
    transition();
  };

  return (
    <>
      <h2>Traffic Light State-Machine</h2>
      <main className="trafficLight">
        <div className="red" data-active={isActive("red")}></div>
        <div className="yellow" data-active={isActive("yellow")}></div>
        <div className="green" data-active={isActive("green")}></div>
      </main>
      <br />
      <div>{response}</div>
      <button onClick={doTransition}>Switch</button>
    </>
  );
}

export default App;
