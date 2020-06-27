import React, { Component } from 'react';
import Paragrapheditor from './Paragrapheditor.js';
// eslint-disable-next-line
import { throws } from 'assert'; 
import Imgcontroller from '../imgController/Imgcontroller.js';
import uuid from 'uuid';
import DisplayEditText from '../DisplayEditText.js';



class SectionEditor extends Component {
  render() {    
    var section = this.props.sec;
    var paraEditors = section.paragraphs.map( (p, i) =>                                                                 
        <Paragrapheditor 
			      p = { p }
			      key = {uuid.v4()}
			      i = {i} 
		        s = {this.props.s} 
			      deleteParag = {this.props.deleteParag} 
			      saveEdit = {this.props.saveParagraphChange} 
			      />
    );
	console.log(this.props.sec);
    return (
        <div id = 'SectionEditor' >
          <div className = 'clip' > Section </div>
            <h2> 
              <DisplayEditText
				          Type= {'Header'}   
				          text = {this.props.sec.heading} 
				          saveEdit = {this.props.headerChange} 
				          i = {this.props.s} 
				          LName = {'docList'}  
				          />             				
            </h2>                       
            <Imgcontroller  
				        docName = {this.props.docName} 
                img = {  this.props.sec.img } 
                s = {this.props.s} 
                pi = {this.props.pi} 
                OpenModalAlert = {this.props.OpenModalAlert} 
                ImageSave = {this.props.ImageSave}
                ImageDescriptionChange = {this.props.ImageDescriptionChange} 
                RemoveImage = {this.props.RemoveImage}
                ChangeImage = {this.props.ChangeImage}
                 
                />				
            <div id = 'listParagrapheditors' >
             {paraEditors}
            </div>                     
             <button onClick = {() => this.props.addaParagraph( this.props.s)} >Add a paragraph </button> 
             <button onClick = {() => this.props.SectionDelete( this.props.s, this.props.pi, this.props.docName, this.props.sec.img.ImageName )} > Delete Section </button>
        </div>
    );
  }
}
 


export default SectionEditor;