import React from 'react';
import './App.css';
import Header from './components/Header';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import ChildrenControl from './components/ChildrenControl';
import CategoriesControl from './components/CategoriesControl.jsx';
import Error404 from './components/Error404';

class App extends React.Component {
  state = {
    auth: true
  }
  render() {
    return (
      <div>
        <Header auth={this.state.auth}/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/children' component={ChildrenControl} />
          <Route path='/categories' component={CategoriesControl}/>
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;
