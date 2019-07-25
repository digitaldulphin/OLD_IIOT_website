import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';


class TheHeader extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
    return (
      <header>
 
        <h1> <Link to ='/'id ="homeLink" > Industrial Internet Of Things Laboratory </Link> - Mohawk College</h1>
        <nav> 
            <Link to ='/'    > About </Link>
            <Link to = '/Projects' > Projects </Link>
            <Link to = '/People' > People </Link>
            <Link to = '/Blog'   > Blog </Link>
            <Link to = '/Events'   > Events </Link>    
            </nav>        
      </header>
    );
    }
}

export default TheHeader;
