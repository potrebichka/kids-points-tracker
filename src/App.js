import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

class App extends React.Component {
  state = {
    auth: false
  }
  render() {
    return (
      <div>
        <Header auth={this.state.auth}/>
        <div>
          Main Page
        </div>
      </div>
    );
  }
}

export default App;
