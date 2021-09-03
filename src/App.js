import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage.component.jsx';

const HatsPage = (props) => {
  console.log(props)
  return (
    <div>
    <h1>HatsPage</h1>
    <button onClick={()=> props.history.goBack()}>back</button>
    </div>
    )
}  

function App() {
  return (
    <div>
    <Switch>
      <Route exact path='/' component={Homepage} /> 
      <Route path='/shop/hats' component={HatsPage} />
    </Switch>
    </div>
  );
}

export default App;
