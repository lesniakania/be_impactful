import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";
import Legend from "../Legend/Legend";
import GlobalStoreContext, { useGlobalReducer } from "../GlobalStore";
import { loadMap as loadMapAction } from "./AppActions";

function App() {
  const [state, dispatch] = useGlobalReducer();

  const loadMap = () => {
    loadMapAction(dispatch);
  };
  useEffect(loadMap, []);

  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Sidebar map={state.app.map} />
        <Map map={state.app.map} />
        <Legend />
      </div>
    </GlobalStoreContext.Provider>
  );
}

export default App;
