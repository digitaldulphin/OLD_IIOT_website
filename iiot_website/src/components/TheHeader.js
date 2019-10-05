import React, { Component } from 'react';


import {
  BrowserRouter as Router,
  Link,
  NavLink,
 
} from 'react-router-dom';


class TheHeader extends Component {
    render() {
    return (
      <header>             
          <h1>             
            Mohawk College - <Link to ='/' id ="homeLink" > Industrial Internet Of Things Laboratory </Link> 
          </h1>                             
          <nav> 
            <NavLink activeClassName='SelectedPage'  exact={true} to ='/'    > About </NavLink>
            <NavLink activeClassName='SelectedPage'  to = '/Projects' > Projects </NavLink>
            <NavLink activeClassName='SelectedPage'  to = '/People' > People </NavLink>            
            <NavLink activeClassName='SelectedPage'  to = '/Events'   > Events </NavLink>    
          </nav>    
      </header>
    );
    }
}

export default TheHeader;
