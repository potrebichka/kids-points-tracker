import React from 'react';
import './App.css';
import Header from './components/Header';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import ChildrenControl from './components/ChildrenControl';
import CategoriesControl from './components/CategoriesControl.jsx';
import Error404 from './components/Error404';
import {FirebaseContext} from './components/Firebase';

class App extends React.Component {
  state = {
    auth: false
  }

  handleAuthStatusChange = () => this.setState({auth: !this.state.auth})

  render() {
    return (
      <div>
        <Header auth={this.state.auth} onAuthStatusChange={this.handleAuthStatusChange}/>
        <div className="opacity">
        <Switch>
          <Route exact path='/' component={Home} />
          <FirebaseContext.Consumer>
            {firebase => {return <Route path='/children' render={() => <ChildrenControl auth={this.state.auth} firebase={firebase}/>} />}}
          </FirebaseContext.Consumer>
          <Route path='/categories' component={CategoriesControl}/>
          <Route component={Error404} />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
