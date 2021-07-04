import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import Login from './login/login';
import { Route, Switch, Link, NavLink, Redirect } from "react-router-dom";
import Dashboard from './dashboard/dashboard';
import petTable from './petTable/petTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/pet-tabel/:id" exact component={petTable} />
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
