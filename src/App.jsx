import React from "react";
import GrapesJSEditor from "./GrapesJSEditor";


function App() {
  return (
    <div className="App">
      <div class="panel__top">
        <div class="panel__basic-actions"></div>
      </div>
      <div id="block">
        <GrapesJSEditor />
      </div>
    </div>
  );
}

export default App;
