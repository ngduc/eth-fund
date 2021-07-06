import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RouteTransition } from './utils/animation/RouteTransition'

import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import Home from './app/Home/Home';
import './App.css';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  );
}

export default App;
