import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import ChildrenControl from './components/Children/ChildrenControl';
import CategoriesControl from './components/Categories/CategoriesControl.jsx';
import CategoryRoute from './components/Category/CategoryRoute';
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
            {firebase => {return <div>
            <Route path='/children' render={() => <ChildrenControl auth={this.state.auth} firebase={firebase}/>}/>
            <Route exact path="/categories" render={() =>   <CategoriesControl auth={this.state.auth} firebase={firebase}/>}/>
            <Route path="/categories/:id" render={()=> <CategoryRoute auth={this.state.auth} firebase={firebase}/>} />
            </div>
            }}
          </FirebaseContext.Consumer>
          <Route component={Error404} />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
