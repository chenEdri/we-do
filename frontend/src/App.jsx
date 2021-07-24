import React, { Component } from "react"
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import {Home} from './pages/Home.jsx';
import { Header } from './cmps/Header.jsx'
import { Footer } from './cmps/Footer.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/user/Login.jsx';
import { SignUp } from './pages/user/SignUp.jsx';
import {ItemApp} from './pages/item/ItemApp.jsx';

export class App extends Component {

  render() {

    return (
      <div className="app">
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={SignUp} exact />
            {/* <Route path="/item" component={ItemApp}/> */}
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

