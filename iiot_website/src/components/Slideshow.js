import React, { Component } from 'react';
import '../css/slideshow.css';


class Slideshow extends Component {
  constructor(props) {
    super(props);
    var c = ["The Joyce Center, For Partnership & Innovation. "," The caption text for image 2."," The caption text for image 3."];
    this.state = {
        slideIndex:1,
        captions: c,
        time: Date.now() 
    };

  }
  componentDidMount() {
    var s = this.state.slideIndex + 1;
    if (s <= 0){
        s = 3
    }
    if (s >= 4){
      s = 1
    }
    //this.interval = setInterval(() => this.setState({ time: Date.now(), slideIndex: s }), 4000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
   
                
    /* <a className="prev" onClick={ () => this.plusSlides(-1) }>&#10094;</a>
       <a className="next" onClick={ () => this.plusSlides(1) }>&#10095;</a>*/
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
                </div>                            
        </div>
    );
  }
}

export default Slideshow;
