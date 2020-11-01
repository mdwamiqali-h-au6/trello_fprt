import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Signup from './components/signup/Signup';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Homepage from './components/Pages/Homepage/Homepage';
import TaskPage from './components/Pages/TaskPage/TaskPage';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/" exact component={Homepage}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/task-details" exact component={TaskPage}/>
      </Switch>
    </Router>
  );
}

export default App;
