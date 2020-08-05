import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login';
import './App.css';
import Signup from './components/signup';
function App() {
  return (
    <Router>
      <div className="contain">
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      </div>
   </Router>
  );
}

export default App;
