import React, { Component } from 'react';


class MYImg extends Component {
  render() {
	  var ImageName = this.props.ImageName;
	  var ImageDescription = this.props.ImageDescription;
	  var cls = this.props.className;			  
	  var img;
		try {			
			img = (   <img src = {require(`./../../../iiot_backend/images/${ImageName}`)} alt= {ImageDescription}   className = {cls} ></img> );
		} catch(e) {
			img = (
				<div className = 'section_Img_Continer' >
					<p> Cannot Find Image: '{`${ImageName}`}'! </p>
				</div>
			);
			console.log(`Cannot find image: ${ImageName}`);
		    console.log(e);
		}
    return ( 
		<div>
		{img}
		</div>
      
    );
  }
}


export default MYImg;
