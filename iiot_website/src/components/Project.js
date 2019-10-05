import React, { Component } from 'react';
import '../css/project.css';
import Section from './Section.js';
import MYImg from './MYImg.js';



class Project extends Component {
   render() {   

	var img = <MYImg ImageName = {this.props.p.img.ImageName} ImageDescription = {this.props.p.img.ImageDescription} />;
    ///img = (  <img src = {require(`../../../iiot_backend/images/${this.props.p.ImageName}`)}  alt = {this.props.p.ImageDescription} className = 'proJectLinkImg'></img> );
 
	var doc = this.props.p.doc.map( ( section, i) =>
		<Section sec = {section} key = {i} />  
  	);
	var projectHeader = {
		overflow:'hidden'
	};
	console.log(this.props.p);

    return (
        <div id = 'A_Project_Page'>
		<div style = {projectHeader}>
			<h2> {this.props.p.Title} </h2>
			<h3> {this.props.p.Description} </h3>
		    <div className = 'Project_Img_Header' > 
				{img}
				<div className = 'textImg'>{this.props.p.img.ImageDescription}  </div>
			</div>
 
		</div>
		<div id = 'projectDocument'>
			{doc}
		</div>
        </div>
    );
  }
}

export default Project;
