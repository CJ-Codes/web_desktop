import "promise-polyfill/src/polyfill";
import "whatwg-fetch";
import "core-js/stable";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./reset.css";

ReactDOM.render(<App />, document.getElementById('root'));