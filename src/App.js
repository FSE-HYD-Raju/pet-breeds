import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import Login from './login/login';
import { Route, Switch, Link, NavLink, Redirect } from "react-router-dom";
import Dashboard from './dashboard/dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
      </div>
    );
  }
}

export default connect(
  state=>({

  }),
  {}
)(App)
