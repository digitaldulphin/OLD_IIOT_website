import React, { Component } from 'react';
import SectionEditor from './SectionEditor.js';
import caller from '../../caller.js'; 
import uuid from "uuid";



class Editdoc extends Component { 
	constructor(props) {
		super(props);
		this.state = { doc: this.props.doc };
	}
	addNewSection = () => {
		var section = { heading: " ", img: {ImageName:false, ImageDescription: false}, paragraphs: [ " " ] };
		var doc = this.state.doc;
		doc.push(section);
		this.props.docChange( doc );
	} 
	deleteParag = ( i, s) => {
		var doc = this.state.doc;
		var paras = doc[s].paragraphs;  
		paras.splice( i , 1);  
		doc[s].paragraphs = paras     
		this.props.docChange( doc );		 
	}
	addaParagraph = (s) => {
		var doc = this.state.doc;
		doc[s].paragraphs.push(" ");	       
		this.props.docChange( doc );
	}
	headerChange = (s, pi, LName, Type, txt) => {
		
		var doc = this.state.doc;      
		doc[s].heading  = txt;
		this.props.docChange( doc );
    }
    saveParagraphChange = (p, s, txt) => {
		var doc = this.state.doc;     
		doc[s].paragraphs[p]  = txt;        
		this.props.docChange( doc );
    }
    ImageDescriptionChange = (s, LName, Type, txt) => {       
		var doc = this.state.doc;      		
		doc[s].img.ImageDescription  = txt;
		this.props.docChange( doc );
    }
	render() {
		 
		var docu = this.props.doc; 
		var SectionsToEdit = docu.map( (section, s ) => 
		  <SectionEditor sec = {section} 
						 key = {uuid.v4()}  
						 s = {s}
						 pi = {this.props.pi}
						 SectionDelete= {this.props.SectionDelete}
						 addaParagraph = {this.addaParagraph}
						 deleteParag = {this.deleteParag} 
						 headerChange = {this.headerChange}
						 paraChange = {this.paraChange} 
						 OpenModalAlert={this.props.OpenModalAlert} 
						 saveParagraphChange={this.saveParagraphChange}
						 docName = {this.props.docName}
						 ImageSave = {this.props.ImageSave}                     
						 RemoveImage = {this.props.RemoveImage}
						 ChangeImage = {this.props.ChangeImage}
						 ImageDescriptionChange = {this.props.ImageDescriptionChange}
						/> );
						
	  return (
		<div>
			<h2> Edit the doc </h2>        
			{SectionsToEdit}
			<div>
				<button onClick = {this.addNewSection} > Add a New Section </button>
			</div>
		</div>
	  );
	}
}



export default Editdoc;