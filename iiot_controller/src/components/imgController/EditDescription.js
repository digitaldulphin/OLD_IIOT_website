import React, { Component } from 'react';
import DisplayEditText from '../DisplayEditText.js';


class EditDescription extends Component {  
  render() {

    var ImageDescription = this.props.img.ImageDescription; 
    return ( 
        <div >
            <h4> Edit Description of Image </h4>   
            <DisplayEditText 
				        Type= {'Image Description'}
				        text = {ImageDescription}  
                saveEdit = {this.props.ImageDescriptionChange} 
                i = {this.props.s}
                pi = {this.props.pi}  
				        LName = {this.props.docName}
			/>              
        </div> 
    );
  }
}


export default EditDescription;