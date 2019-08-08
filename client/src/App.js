import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {verifyToken} from './actions/userActions.js'

import './App.css';

/* COMPONENTS  */
import {PrivateRoute} from './components/ProtectedRoute.js';
import Home from './components/Home.js';
import Entry from './components/Entry.js';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import SignIn from './components/forms/SignIn.js';
import SignUp from './components/forms/SignUp.js';
import NewEntry from './components/forms/NewEntry.js';

export default function App() {
const dispatch = useDispatch();

useEffect(() => {
  dispatch(verifyToken());
}, [dispatch])

  return (
    <div>
      <Router>
        <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/entry/:id" component={Entry} />
            <Route exact path="/page/:page" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/new" component={NewEntry} />
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}
