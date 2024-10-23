import { useState } from 'react';

const useUndo = ({
  addElementFn = () => {},
  removeElementFn = () => {},
  moveElementFn = () => {}
}) => {
  const [history, setHistory] = useState([]);

  const undo = () => {
    let lastOperation =
      history.length !== 0 ? history[history.length - 1] : null;

    setHistory((history) => history.slice(0, history.length - 1));
    execOperation(lastOperation);
  };

  const execOperation = (operation) => {
    if (!operation) return;
    switch (operation.type) {
      case 'add':
        removeElementFn(operation);
        break;
      case 'remove':
        addElementFn(operation);
        break;
      default:
    }
  };

  const registerOperation = (type, data) => {
    let operation = { type, data };

    setHistory((history) => [...history, operation]);
  };

  return {
    undo,
    registerOperation
  };
};

export default useUndo;
