import { MAP_CREATED } from "../ActionTypes";
import { createMap } from "../MapBoxApi";

export function loadMap(dispatch) {
  const map = createMap();
  dispatch({ type: MAP_CREATED, map: map });
}
