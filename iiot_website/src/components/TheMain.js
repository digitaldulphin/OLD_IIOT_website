import React, { Component } from 'react';

import About from './About.js';
import Events from './Events.js';
import People from './People.js';
import Projects from './Projects.js';
  import Project from './Project.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch,
} from 'react-router-dom';

class TheMain extends Component {
  render() {  
    var AboutInfo = this.props.AppData.AboutPage; 
    var PeopleInfo = this.props.AppData.PeoplePage;
    var EventList = this.props.AppData.EventList;   
    var projs = this.props.AppData.projects;      
    var rou = [];
    var rou = projs.map( (p, i) => 
      <Route key = {i} path={ `/Project_${i}` } render={(props) => <Project {...props}  p = {p} />} />
    );
    return (
      <main>
          <Switch>
          <Route exact path='/' render={(props) => <About {...props}  AboutInfo = {AboutInfo} />}/>  
          <Route path='/Projects'  render={(props) => <Projects {...props}  projs = { projs } />} />
            {rou}
          <Route path='/People' render={(props) => <People {...props} PeopleInfo = {PeopleInfo}  />} />
          <Route path='/Events' render={(props) => <Events {...props} EventList = {EventList} />} />        
          <Route render={() => (
             <Redirect to='/' />
          )} />
        </Switch>                 
      </main>
    );
  }
}

export default TheMain;
