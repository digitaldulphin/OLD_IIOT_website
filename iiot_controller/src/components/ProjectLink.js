import React, { Component } from 'react';
 import '../css/ProjectLink.css';

 

class ProjectLink extends Component {
  render() {
    var p = this.props.p;
    
    var img;
    try {
        img = (  <img src = {require(`../../../iiot_backend/images/${p.img.ImageName}`)}  alt = {p.alt} className = 'proJectLinkImg'></img> );
    } catch(e) {
        img = (
            <div className = 'proJectLinkImg' >
                <p> Cannot Find Image: '{p.img.ImageName}'! </p>
            </div>
        );
        //console.log('Cannot find image: '+p.img.ImageName);
       // console.log(e);
    }
    return (     
        <div className = 'ProjectLink'   >
            {img}
            <div className = 'ProjText' > 
                <h3>{p.Title}</h3>                           
                <p>{p.Description}</p>
            </div>
            <div className = 'MoveUpDownInList' >
                <div> Move up or down in list. Position: {this.props.pi + 1} </div>
                <button  onClick= {() => this.props.moveUp(this.props.pi )} >Up</button>
			    <button  onClick= {() => this.props.moveDown(this.props.pi )}  >down</button> 
              </div>
              <div className = 'EditNDeletPrijlct' >
                <div> Edit Project Infomation or Delete Project</div>
                <button onClick = { () => this.props.OpenModalAlert( { type: 'EditProjectDocument', p:p, pi:this.props.pi} )} >Edit</button>
			    <button  onClick= {() => this.props.delProj(this.props.pi, '')}  >Delete</button> 
              </div>
              
        </div>   
    );
  }
}

export default ProjectLink;
