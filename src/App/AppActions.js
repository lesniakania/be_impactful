import { MAP_CREATED, SHOW_POPUP } from "../ActionTypes";
import { createMap } from "../MapBoxApi";

export function loadMap(dispatch) {
  const map = createMap();
  dispatch({ type: MAP_CREATED, map: map });
}

export function showPopup(dispatch, popup) {
  dispatch({ type: SHOW_POPUP, popup: popup });
}
