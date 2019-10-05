import React, { Component } from 'react';
import LoadAnImage from './LoadAnImage.js';
import ChangeImage from './ChangeImage.js';
import EditDescription from './EditDescription.js';
import RemoveImage from './RemoveImage.js';


class EditImageModal extends Component {
	render() {
		var option = '';
		var Load = (<LoadAnImage name = {this.props.name} s = {this.props.s}  pi = { this.props.pi}  ImageSave = {this.props.ImageSave} docName = {this.props.docName} />);
		var Change = (<ChangeImage name = {this.props.name} s = {this.props.s}  pi = { this.props.pi}  ChangeImage = {this.props.ChangeImage} docName = {this.props.docName} />);
		var EditD=(<EditDescription name = {this.props.name} s = {this.props.s}  pi = { this.props.pi}  docName = {this.props.docName} ImageDescriptionChange = {this.props.ImageDescriptionChange} img = {this.props.img} />);
		var Remove = (<RemoveImage s = {this.props.s} pi = { this.props.pi} docName = {this.props.docName} img = {this.props.img} RemoveImage = {this.props.RemoveImage} />);
				
		if (this.props.type === 'LoadAnImage') {
		  option = Load;
		} else if (this.props.type === 'ChangeImage')  {
		  option = Change;
		} else if (this.props.type === 'EditDescription') {
		  option = EditD;
		} else if (this.props.type === 'RemoveImage') {
		  option = Remove;
		}
		
		return ( 
			<div className = 'modal'>   
			  <div className = 'modal-content'>   
				<button onClick = {this.props.cancel} className="close">&times;</button>    
				<h4> Edit Image Modal</h4>				  
				{option}				  
				<button onClick = {this.props.cancel} > cancel </button>
			  </div>       
			</div> 
		);
	}
}


export default EditImageModal;