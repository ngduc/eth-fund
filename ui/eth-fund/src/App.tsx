import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './app/Home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/badges">
          <Home page="badges" />
        </Route>
        <Route path="/detail">
          <Home page="detail" />
        </Route>
        <Route path="/">
          <Home page="list" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
