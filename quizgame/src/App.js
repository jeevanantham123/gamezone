import React from 'react';
import { Router , Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import history from './history';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Preview from './components/preview';
import UserHome from './components/userhome';

function App() {
  return (
    <Router history={history}>
      <div className="contain">
      <Route path="/" exact component={UserHome} />
      <Route path="/admin" exact component={Login} />
      <Route path="/admin/signup" exact component={Signup} />
      <Route path="/admin/home" exact component={Home} />
      <Route path="/admin/preview" exact component={Preview} />
      </div>
   </Router>
  );
}

export default App;
