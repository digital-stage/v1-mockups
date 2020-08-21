import React from "react";
import "./App.css";
import Stage from "./Containers/Stage/Stage";
import Login from "./Containers/Login";
import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_CONFIG } from "./env";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JoinStage from "./Containers/Stage/JoinStage";
import Welcome from "./Containers/Login/Welcome";

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Stage/> */}
        {/* <Login /> */}
      </Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route path="/stage" component={Stage} />
        <Route path="/join-stage" component={JoinStage} />
      </Switch>
    </div>
  );
}

export default App;
