import React, { Component } from 'react';
import DisplayEditText from './DisplayEditText.js';
import Imgcontroller from './imgController/Imgcontroller.js';
import Editdoc from './Editdoc/Editdoc.js';

class EditSelectedProject extends Component {  
	projectDocChange = (doc) => {
		var pi = this.props.pi;

		this.props.projectDocChange(doc, pi);
	}
  render() {
    //console.log( 's = {'+this.props.s+'} pi = {'+this.props.pi+'}'); 
	var projdoc  = this.props.p.doc;		
	var mainProjImg = this.props.p.img;		
    return ( 
        <div >
            <h1>Edit Project </h1> 

			<div id = 'SetImageInterface' >
				<h1> Project Title & Project Description</h1>
				<h2> 
              	<DisplayEditText
				        Type= {'Title'}   
				        text = {this.props.p.title} 
				        saveEdit = {this.props.ProjTitleSave} 
				        i = {this.props.pi} 
				        LName = {'Project_Heading'}  
				        />             				
            	</h2>  
				<h3> 
              	<DisplayEditText
				          Type= {'Description'}   
				          text = {this.props.p.Description} 
				          saveEdit = {this.props.ProjDescSave} 
				          i = {this.props.pi} 
				          LName = {'Project_Heading'}  
				          />             				
            	</h3>  
			</div>
            <div id = 'SetImageInterface' >
					<h3> Change Main Image </h3>
					<Imgcontroller  
						docName = {'Main_Project_Image'} 
                        img = {  mainProjImg } 
						s = {null} 
						pi = {this.props.pi} 
						OpenModalAlert = {this.props.OpenModalAlert} 
						
                        ImageSave = {this.props.ImageSave}
                        ImageDescriptionChange = {this.props.ImageDescriptionChange} 
                        RemoveImage = {this.props.RemoveImage}
                        ChangeImage = {this.props.ChangeImage}
						/>
			</div>
				<div> 
					<Editdoc 
						docName={'Project_Doc_Image'}  
						doc={ projdoc } 
						OpenModalAlert = {this.props.OpenModalAlert} 
						pi = {this.props.pi} 
						docChange = {this.projectDocChange} 
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


export default EditSelectedProject;