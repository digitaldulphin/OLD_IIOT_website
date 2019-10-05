import React, { Component } from 'react';
import '../css/projects.css';
import MYImg from './MYImg.js';
import {
    BrowserRouter as Router, Link,
} from 'react-router-dom';
  

class Projects extends Component {
  render() {
    var arry = this.props.projs; 
    var prolinks = [];    
    prolinks = arry.map( (p, i) => 
        <Link to = { `/Project_${i}`}  key = {i}  className = 'Project'  >            
			<MYImg ImageName = {p.img.ImageName} ImageDescription = {p.img.ImageDescription} />			
            <div className = 'ProjText'> 
                <h3>{p.Title}</h3>                           
                <p>{p.Description}</p>
            </div>
        </Link>   
    ); 
    return (
        <div id = 'ProjectsPage'>
            <h2> Projects </h2>            
            {prolinks}            
        </div>
    );
  }
}


export default Projects;