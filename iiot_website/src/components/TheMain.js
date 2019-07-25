import React, { Component } from 'react';

import About from './About.js'
import Events from './Events.js'
import Blog from './Blog.js'
import People from './People.js'
import Projects from './Projects.js'
  import Project_1 from './projects/Project_1.js'
  import Project_2 from './projects/Project_2.js'


import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';



class TheMain extends Component {
  constructor(props) {
	   super(props);
     
  }
  render() {
    return (
      <main>
          <Switch>
          <Route exact path='/' render={(props) => <About {...props}  />}/>  
          <Route path='/Projects'  render={(props) => <Projects {...props}   />} />
              <Route path='/Project_1'  render={(props) => <Project_1 {...props}   />} />
              <Route path='/Project_2'  render={(props) => <Project_2 {...props}   />} />
          <Route path='/People' render={(props) => <People {...props}   />} />
          <Route path='/Blog' render={(props) => <Blog {...props}   />} />
          <Route path='/Events' render={(props) => <Events {...props}  />} />        
          <Route render={() => (
             <Redirect to='/' />
          )} />
        </Switch>                 
      </main>
    );
  }
}

export default TheMain;
