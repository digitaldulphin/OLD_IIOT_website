import React, { Component } from 'react';
import '../css/slideshow.css';


class Slideshow extends Component {
  constructor(props) {
    super(props);
    var c = ["The caption text for image 1. "," The caption text for image 2."," The caption text for image 3."];
    this.state = {
        slideIndex:1,
        captions: c
    };

  }
  plusSlides( x ) {
      var s = this.state.slideIndex + x;
      if (s <= 0){
          s = 3
      }
      if (s >= 4){
        s = 1
      }
      this.setState({ slideIndex: s   });
   
  }
  render() {
    var imgXjpg = 'img'+this.state.slideIndex+'.jpg';
    var img = ( <img src = {require('../images/slideshow/'+imgXjpg+'')} className = 'slide'  ></img> );
    var CaptionText = this.state.captions[this.state.slideIndex -1];


    return (
        <div id = 'Slideshow'>                        
            <div className="slideshow-container">
                
                <div className="mySlides fade">                                  
                    {img}
                    <div id="SlideText">{CaptionText}</div>
                </div>             
                
                <a className="prev" onClick={ () => this.plusSlides(-1) }>&#10094;</a>
                <a className="next" onClick={ () => this.plusSlides(1) }>&#10095;</a>
            
                </div>
                
            
        </div>
    );
  }
}

export default Slideshow;
