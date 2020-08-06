import React from 'react';
import { Router , Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import history from './history';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';

function App() {
  return (
    <Router history={history}>
      <div className="contain">
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/home" exact component={Home} />
      </div>
   </Router>
  );
}

export default App;
