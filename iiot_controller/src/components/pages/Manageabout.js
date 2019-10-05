import React, { Component } from 'react';
import '../../css/Manageabout.css';
import Editdoc from '../Editdoc/Editdoc.js';
import Imgcontroller from '../imgController/Imgcontroller.js';


class Manageabout extends Component { 
	render() {
		var doc  = this.props.AboutInfo.doc;		
		var slideImg = this.props.AboutInfo.SlideShowImg;		
		return (
			<div id = 'content'>
				<h2> Manage About </h2>		 
				<div id = 'SetImageInterface' >
					<h3> Change Main Image </h3>
					<Imgcontroller  
						docName = {'SlideShow'} 
                        img = {  slideImg } 
                        s = {null} 
                        OpenModalAlert = {this.props.OpenModalAlert} 
                        ImageSave = {this.props.ImageSave}
                        ImageDescriptionChange = {this.props.ImageDescriptionChange} 
                        RemoveImage = {this.props.RemoveImage}
                        ChangeImage = {this.props.ChangeImage}
						/>
				</div>
				<div> 
					<Editdoc
						docName={'Aboutdoc'} 
						doc={ doc } 
						pi = {null} 
						OpenModalAlert = {this.props.OpenModalAlert} 
						docChange = {this.props.AboutdocChange} 
						ImageSave = {this.props.ImageSave}
						RemoveImage = {this.props.RemoveImage}
						ChangeImage = {this.props.ChangeImage}
						ImageDescriptionChange = {this.props.ImageDescriptionChange} 
						SectionDelete = {this.props.SectionDelete}
						/>				
				</div>
			</div>
		);
	}
}

export default Manageabout;


