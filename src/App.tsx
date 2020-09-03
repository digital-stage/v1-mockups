import React from "react";
import "./App.css";
import Stage from "./Containers/Stage/Stage";
import Login from "./Containers/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import JoinStage from "./Containers/Stage/JoinStage";
import Welcome from "./Containers/Login/Welcome";
import Home from "./Containers/Home";
import { ProvideAuth, useAuth } from "./hooks/useAuth.js";
import PageNotFound from "./Containers/PageNotFound";

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Routes />
      </div>
    </ProvideAuth>
  );
}

function Routes() {
  const auth = useAuth();

  // useEffect(() => {
  //   return () => {
  //     window.onbeforeunload = (e:any) =>
  //       {
  //         e.preventDefault();
  //         auth.removeCookie('digital-stage')
  //       }
  //   }
  // }, [])

  return (
    <Switch>
      <ProtectedLogin exact path="/" component={Welcome} auth={auth.cookie} />
      <ProtectedLogin exact path="/login" component={Login} auth={auth.cookie} />
      <ProtectedRoutes path="/stage" component={Stage} auth={auth.cookie} />
      <ProtectedRoutes path="/join-stage" component={JoinStage} auth={auth.cookie} />
      <ProtectedRoutes path="/home" component={Home} auth={auth.cookie} />
      <Route path='*' exact={true} component={PageNotFound} />
    </Switch>
  )
}

function ProtectedRoutes({ auth, component: Component, ...rest }: any) {
  console.log(auth);
  return (
    <Route
      {...rest}
      render={() => {
        return (
          Object.keys(auth).length > 0 ? <Component /> : <Redirect to="/" />
        )
      }}
    />
  )
}

function ProtectedLogin({ auth, component: Component, ...rest }: any) {
  console.log(auth);
  return (
    <Route
      {...rest}
      render={() => {
        return (
          Object.keys(auth).length === 0 ? <Component /> : <Redirect to="/home" />
        )
      }}
    />
  )
}

export default App;
