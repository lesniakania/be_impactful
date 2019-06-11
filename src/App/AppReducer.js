import { MAP_CREATED } from "../ActionTypes";

export default function AppReducer(state = {}, action) {
  switch (action.type) {
    case MAP_CREATED:
      return {
        ...state,
        map: action.map
      };
    default:
      return state;
  }
}
