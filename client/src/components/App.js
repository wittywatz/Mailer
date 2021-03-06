import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import * as actions from './actions';
import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import Survey from './surveys/Survey';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Route
            path="/"
            exact
            render={() =>
              this.props.auth ? <Redirect to="/surveys" /> : <LandingPage />
            }
          />
          <div className="container">
            <Route
              path="/surveys"
              exact
              render={() =>
                !this.props.auth ? <Redirect to="/" /> : <Dashboard />
              }
            />
            <Route path="/surveys/new" exact component={Survey} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, actions)(App);
