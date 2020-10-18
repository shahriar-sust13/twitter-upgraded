import React, { Component } from 'react';
import Login from './components/login';
import Users from './components/users';
import Welcome from './components/welcome';
import Middleware from './components/middleware';
import Profile from './components/profile';
import Register from './components/register';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Newsfeed from './components/newsfeed';

class App extends Component {
  state = { 
    SERVER_URL: 'http://localhost:5000/'
  }
  render() { 
    return (
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login server_url={this.state.SERVER_URL} />
          </Route>          
          <Route path="/newsfeed">
            <Middleware server_url={this.state.SERVER_URL} />
          </Route>
          <Route path="/users">
            <Users server_url={this.state.SERVER_URL} />
          </Route>
          <Route path='/user/:id' render={({ 
            match 
            }) => (
            <Profile server_url={this.state.SERVER_URL} match={match} />
            )}
          />
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </Router>
    );
  }
}
 
export default App;