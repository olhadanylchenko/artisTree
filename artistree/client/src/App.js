import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

class App extends React.Component {
  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render(){
    return (
      <div className="App">
      <Route
      exact path='/signup'
      render={props => <Signup setUser={this.setUser} {...props} />}
      />
      <Route
      exact path='/login'
      render={props => <Login setUser={this.setUser} {...props} />}
      />
    </div>
    );
  }
}


export default App;