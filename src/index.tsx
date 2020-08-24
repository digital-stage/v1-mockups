import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BreakpointProvider } from "./breakpoint";
import { BrowserRouter } from "react-router-dom";

const queries = {
  mobile: "(max-width: 375px)",
  xs: "(max-width: 500px)",
  sm: "(max-width: 768px)",
  md: "(max-width: 1024px)",
  or: "(orientation: portrait)", // we can check orientation also
};

ReactDOM.render(
        <BreakpointProvider queries={queries}>
          <React.StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </React.StrictMode>
        </BreakpointProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
