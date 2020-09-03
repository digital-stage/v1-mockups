import React from "react";
import "./App.css";
import Stage from "./Containers/Stage/Stage";
import Login from "./Containers/Login";
import { Switch, Route } from "react-router-dom";
import JoinStage from "./Containers/Stage/JoinStage";
import Welcome from "./Containers/Login/Welcome";
import Home from "./Containers/Home";
import { ProvideAuth } from "./Hooks/useAuth.js";

function App(props:any) {
  return (
    <ProvideAuth>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route path="/stage" component={Stage} />
          <Route path="/join-stage" component={JoinStage} />
          <Route path="/home" component={Home} history={props.history}/>
        </Switch>
      </div>
    </ProvideAuth>
  );
}

export default App;
