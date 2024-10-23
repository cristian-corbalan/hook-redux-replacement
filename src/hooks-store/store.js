import { useEffect, useState } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export function useStore (shouldListen = true) {
  const [, setState] = useState(globalState);

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(listener => listener !== setState);
      }
    };
  }, [setState, shouldListen]);

  function dispatch (actionIdentifier, payload) {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  }

  return [globalState, dispatch];
}

export function initializeStore (initialState, userActions) {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
}
