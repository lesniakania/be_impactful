import { createContext, useContext, useReducer } from "react";
import AppReducer from "./App/AppReducer";

export const initialGlobalState = { app: {} };

const GlobalStoreContext = createContext({
  state: initialGlobalState,
  dispatch: Function.prototype
});
export default GlobalStoreContext;

export const globalReducer = combineReducers({
  app: AppReducer
});

export function useGlobalStoreContext(key) {
  const { state, dispatch } = useContext(GlobalStoreContext);

  const localState = state[key];

  if (localState === undefined) throw Error(`No local state for key '${key}'`);

  return { state: localState, dispatch };
}

export function useGlobalReducer() {
  return useReducer(globalReducer, initialGlobalState);
}

function combineReducers(reducers) {
  return function(state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      // Call every reducer with the part of the state it manages
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}
