import React, { Component } from 'react';
import MYImg from './MYImg.js';


class Section extends Component {
  render() {
    var paragraphs = this.props.sec.paragraphs.map( (p, i) =>
        <p key = {i}>{p}</p>
    ); 
	var ImageBlock = '';
	if ( this.props.sec.img.ImageName  !== false) {	
		///className = 'proJectLinkImg'
		var img = <MYImg ImageName = {this.props.sec.img.ImageName} ImageDescription = {this.props.sec.img.ImageDescription} />;			
		ImageBlock	= (
			<div className = 'section_Img_Continer' >
			{img}			
			<div className = 'textImg'> This is the image description. </div>	
			</div>			
		);			
	}
    return (
        <div className = 'section' >
     	      <h2> {this.props.sec.heading}  </h2>			
			{ImageBlock}			 
            {paragraphs}
        </div>
    );
  }
}


export default Section;
