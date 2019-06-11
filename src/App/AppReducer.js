import { MAP_CREATED, SHOW_POPUP } from "../ActionTypes";

export default function AppReducer(state = {}, action) {
  switch (action.type) {
    case MAP_CREATED:
      return {
        ...state,
        map: action.map
      };
    case SHOW_POPUP:
      if (state.popup) {
        state.popup.remove();
      }
      return {
        ...state,
        popup: action.popup
      };
    default:
      return state;
  }
}
