import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./static/index.css";
import { Signup, Login } from "./modules/auth";
import { MainPage } from "./modules/main/index";
require('dotenv').config()

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
