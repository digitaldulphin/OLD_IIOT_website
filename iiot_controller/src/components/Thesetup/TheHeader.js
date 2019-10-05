import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom';


class TheHeader extends Component {
    render() {
    return (
      <header>
        <h1> Controller for IIOT website</h1>
        <h2> Select a menu option. </h2>
        <h3> 'Go To Live Website' does <i>not</i> log you out. </h3>
          
          <nav  className = 'menu'> 
            <p> CRUD </p>
            <NavLink activeClassName='SelectedPage'  exact={true} to ='/manageAbout'> Manage About </NavLink>
            <NavLink activeClassName='SelectedPage'  to = '/manageProjects'> Manage Projects </NavLink>
            <NavLink activeClassName='SelectedPage'  to = '/managePeople'> Manage People </NavLink>            
            <NavLink activeClassName='SelectedPage'  to = '/manageEvents'> Manage Events </NavLink>    
          </nav>    

          <nav className = 'leave'> 
            <p>Leave</p>
            <a href = 'https://normanpotts.com/WebPortfolio/IIOT' className = 'GoToWebsite' > Go To Live Website</a>
            <a href = '/logout' className = 'logout' > Logout </a>
          </nav>  

      </header>
    );
    }
}


export default TheHeader;
