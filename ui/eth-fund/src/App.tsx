import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RouteTransition } from './utils/animation/RouteTransition'
import Home from './app/Home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch>
          <RouteTransition path="/badges">
            <Home page="badges" />
          </RouteTransition>
          <RouteTransition path="/detail">
            <Home page="detail" />
          </RouteTransition>
          <RouteTransition path="/">
            <Home page="list" />
          </RouteTransition>
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
