import React from "react";
import "./App.css";
import Stage from "./Containers/Stage/Stage";
import Login from "./Containers/Login";
import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_CONFIG } from "./env";
import { Switch, Route } from "react-router-dom";
import JoinStage from "./Containers/Stage/JoinStage";
import Welcome from "./Containers/Login/Welcome";
import Home from "./Containers/Home";

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route path="/stage" component={Stage} />
        <Route path="/join-stage" component={JoinStage} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
