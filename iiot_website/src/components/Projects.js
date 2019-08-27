import React, { Component } from 'react';
import '../css/projects.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
  } from 'react-router-dom';
  

class Projects extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div id = 'content'>

            <h2> Projects </h2>
        
            <div id = ''>


                <Link to = '/Project_1' className = 'Project'  >
                    <img src = {require('../images/goose.jpg')}  alt = 'image of lab or building' ></img>                     
                    <div className = 'ProjText'> 
                        <h3>Project dog tracker</h3>                           
                        <p>This project is all about tracking dogs at a farm.</p>
                    </div>
                </Link>    


                <Link  to = '/Project_2' className = 'Project' >
                    <img src = {require('../images/goose.jpg')}   alt = 'image of lab or building' ></img> 
                    
                    <div className = 'ProjText'> 
                        <h3>Weather Monitor</h3>                    
                        <p>This project is all about monitoring the weather.</p>
                    </div>
                </Link>

            
                <Link to = '/Project_1' className = 'Project'  >
                    <img src = {require('../images/goose.jpg')}  alt = 'image of lab or building' ></img>                     
                    <div className = 'ProjText'> 
                        <h3>Project dog tracker</h3>                           
                        <p>This project is all about tracking dogs at a farm.</p>
                    </div>
                </Link>    


                <Link  to = '/Project_2' className = 'Project' >
                    <img src = {require('../images/goose.jpg')}   alt = 'image of lab or building' ></img> 
                    
                    <div className = 'ProjText'> 
                        <h3>Weather Monitor</h3>                    
                        <p>This project is all about monitoring the weather.</p>
                    </div>
                </Link>
                
                <Link to = '/Project_1' className = 'Project'  >
                    <img src = {require('../images/goose.jpg')}  alt = 'image of lab or building' ></img>                     
                    <div className = 'ProjText'> 
                        <h3>Project dog tracker</h3>                           
                        <p>This project is all about tracking dogs at a farm.</p>
                    </div>
                </Link>    


                <Link  to = '/Project_2' className = 'Project' >
                    <img src = {require('../images/goose.jpg')}   alt = 'image of lab or building' ></img> 
                    
                    <div className = 'ProjText'> 
                        <h3>Weather Monitor</h3>                    
                        <p>This project is all about monitoring the weather.</p>
                    </div>
                </Link>

            </div>
        </div>
    );
  }
}

export default Projects;
