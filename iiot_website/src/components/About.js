import React, { Component } from 'react';
import '../css/about.css';
import Slideshow from './Slideshow.js';
import Section from './Section.js';
 

class About extends Component {
  render() {
    var AboutInfo =  this.props.AboutInfo;
	console.log( this.props.AboutInfo);
    var doc  =  AboutInfo.doc.map( ( section, i) =>
      <Section sec = {section} key = {i} />  
    );
    return (
        <div id = 'AboutContent'>
            <Slideshow SlideImg = {this.props.AboutInfo.SlideShowImg}/>  
            <br />
            <div id = 'Document'>
              {doc}
            </div>
        </div>
    );
  }
}



export default About;
 