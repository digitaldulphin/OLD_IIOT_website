import React, { Component } from 'react';
 



class RemoveImage extends Component {
  RemoveImage = () => {
    //console.log(this.props);
	this.props.RemoveImage(this.props.s, this.props.img, this.props.docName, this.props.pi);     
  }
  render() {
    //console.log(this.props);
    return ( 
        <div>  
            <h4> Are you sure you want to remove this image? </h4>  
            <p>{this.props.img.ImageName}</p>
            <p>{this.props.img.ImageDescription}</p>
            <button onClick = {this.RemoveImage}> Yes remove this image. </button> 
        </div> 
    );
  }
}



export default RemoveImage;