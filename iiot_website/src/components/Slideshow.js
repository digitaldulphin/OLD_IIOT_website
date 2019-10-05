import React, { Component } from 'react';
import '../css/slideshow.css';
import MYImg from './MYImg.js';


class Slideshow extends Component {
  render() {
	console.log(this.props);
    var descip = this.props.SlideImg.ImageDescription;
    var iname = this.props.SlideImg.ImageName;		
	var img = <MYImg ImageName = {iname} ImageDescription = {descip} className = 'slide' />;		        
    return (
        <div id = 'Slideshow'>                        
            <div className="slideshow-container">                
                <div className="mySlides fade">                                  
                    {img}
                    <div id="SlideText">{descip}</div>
                </div>                         
            </div>                            
        </div>
    );
  }
}


export default Slideshow;