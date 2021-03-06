import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Subheader from './components/SubHeader';
import Home from './components/Home';
import ChildrenControl from './components/Children/ChildrenControl';
import CategoriesControl from './components/Categories/CategoriesControl.jsx';
import CategoryRoute from './components/Category/CategoryRoute';
import ChildRoute from './components/Child/ChildRoute';
import Error404 from './components/Error404';

import {FirebaseContext} from './components/Firebase';
import AuthContext from './hoc/AuthContext';

class App extends React.Component {
  state = {
    auth: false,
    showChildren: false
  }

  handleAuthStatusChange = () => this.setState({auth: !this.state.auth})

  handleChildrenClick = () => this.setState({showChildren: !this.state.showChildren});

  render() {
    return (
      <div>
        <Header auth={this.state.auth} onAuthStatusChange={this.handleAuthStatusChange} onChildrenClick={this.handleChildrenClick}/>
        {this.state.showChildren && this.state.auth ? 
          <FirebaseContext.Consumer>
            {firebase => {return <Subheader firebase={firebase}/>}}
          </FirebaseContext.Consumer> : 
        null}
        <div className="opacity">
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthContext.Provider value={{authenticated: this.state.auth}}>
              <FirebaseContext.Consumer>
                {firebase => {return <div>
                <Route exact path='/children' render={() => <ChildrenControl firebase={firebase}/>}/>
                <Route exact path="/categories" render={() => <CategoriesControl firebase={firebase}/>}/>
                <Route path="/categories/:id" render={(props)=> <CategoryRoute {...props} firebase={firebase} />} />
                <Route path="/children/:id" render={() => <ChildRoute firebase={firebase} />} />
                </div>
                }}
              </FirebaseContext.Consumer>
            </AuthContext.Provider>
            <Route component={Error404} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
