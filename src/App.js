import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubsribeFromAuth = null;
  unsubsribeFromOnSnapShot = null;

  componentDidMount() {
    this.unsubsribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        this.unsubsribeFromOnSnapShot = userRef.onSnapshot(snapShot => {
          
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state)
        });
      } else {
        this.setState({currentUser: userAuth})
      }
    })
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
    if(this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
  }

  render() {
    return (
      <div>
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={Homepage} /> 
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/account' component={SignInAndSignUpPage} />
      </Switch>
      </div>
    );
  }
  
}

export default App;
