import React, { Component } from 'react';
import LoadAnImage from './LoadAnImage.js';



class ChangeImage extends Component {
 
  render() {
    return ( 
        <div >   
            <h4> Change Image </h4>
            <LoadAnImage  
				        name = {this.props.name} 
                s = {this.props.s}   
                pi = {this.props.pi}              
                ImageSave = {this.props.ChangeImage} 
                docName = {this.props.docName} />
        </div> 
    );
  }
}



export default ChangeImage;