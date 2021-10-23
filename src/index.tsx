import * as React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import { CuttleCanvas } from './cuttleCanvasDemo/index';
import { fabricExtend } from './cuttleCanvasDemo/fabricExtend';

fabricExtend();

const styles = {
  fontFamily: "sans-serif"
};


const App = () => (
  <div style={styles}>
    <Hello name="Fabric.js Demo App" />
    <CuttleCanvas />
  </div>
);

render(<App />, document.getElementById("root"));
