import React, { Fragment } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import './App.css';
import ContactState from '../src/Context/Contacts/contactState';

const App=()=> {
  return (
    <ContactState>
    <Router>
    <Fragment>
     <Navbar/>
     <div className='container'>
     <Switch>
     <Route exact path='/' component={Home}/>
     <Route exact path='/about' component={About}/>
     </Switch>
     </div>
    </Fragment>
    </Router>
    </ContactState>
  );
}

export default App;
