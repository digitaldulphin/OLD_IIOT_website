import React, { Component } from 'react';
import '../css/about.css';
import Slideshow from './Slideshow.js';


class About extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div id = 'About'>

            <Slideshow />  
            
            <br />
            <div id = 'Document'>
            <h2> About </h2>

              <img src = {require('../images/goose.jpg')} id = 'gooseimg' alt = 'image of lab or building' ></img> 
              <p> 
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
              </p>
              
              <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
              </p>
              <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
              </p>
       
            </div>
            <br />
            <div id = 'Document'>
                <h2> Where ? </h2> 
                <img src = {require('../images/goose.jpg')} id = 'gooseimg' alt = 'image of lab or building' ></img> 
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
               </p>               
               
            </div>

            <br />
            <div id = 'Document'>
                <h2> How to get involved ? </h2> 

                <img src = {require('../images/goose.jpg')} id = 'gooseimg' alt = 'image of lab or building' ></img> 
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis voluptatem a optio voluptas illum laborum possimus iure aspernatur? Veniam cupiditate hic porro nobis rem at alias debitis sint deserunt.
               </p>               
             
;
            </div>

        </div>
    );
  }
}

export default About;
