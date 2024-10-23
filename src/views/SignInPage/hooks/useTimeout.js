import { useRef, useEffect } from 'react';

function useTimeout(timeoutAction, time) {
  const timeoutFunction = useRef(null);

  useEffect(() => () => clearTimeout(timeoutFunction.current), [0]);

  function startTimeout() {
    timeoutFunction.current = setTimeout(timeoutAction, time);
  }

  function resetTimeout() {
    stopTimeout();
    startTimeout();
  }

  function stopTimeout() {
    clearTimeout(timeoutFunction.current);
  }

  return [startTimeout, resetTimeout, stopTimeout];
}

export default useTimeout;
