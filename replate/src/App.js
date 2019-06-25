import React from 'react';
import { Route } from 'react-router-dom';
import BusinessSignUp from './components/businessSignup';
import Login from './components/login';
import NavBar from './components/navbar';
import PrivateRoute from './components/privateRoute';
import BusinessDashboard from './components/businessDashboard';
import VolunteerDashboard from './components/volunteerDashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1> Hello</h1>
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/business-sign-up" render={props => <BusinessSignUp {...props} />} />
      <PrivateRoute exact path='/business-dashboard' component={BusinessDashboard} />
      <PrivateRoute exact path='/volunteer-dashboard' component={VolunteerDashboard} />
    
      
      
    </div>
  );
}

export default App;
