import React, { Component } from 'react';
import { switchCase } from '@babel/types';

import EditSelectedProject from './EditSelectedProject.js';

import LoadAnImage from './imgController/LoadAnImage.js';
import ChangeImage from './imgController/ChangeImage.js';
import EditDescription from './imgController/EditDescription.js';
import RemoveImage from './imgController/RemoveImage.js';


class ModalAlert extends Component {  
  render() {
    var content = '';
    var message =  this.props.message;
    ///console.log(this.props);
    if(typeof message === 'string'  ) {
      content = (
        <div>                                       
		      <h4> {message} </h4>              
          <button onClick = {this.props.CloseModal} > okay </button>
        </div>
      );
    } else if (typeof message === 'object') {
      let type = this.props.message.type;
      
      var editdocproject = (<EditSelectedProject  
                                ProjTitleSave = {this.props.ProjTitleSave}
                                ProjDescSave = {this.props.ProjDescSave}
                                p = {this.props.AppData.projects[message.pi]} 
                                pi = {message.pi} 
                                changeToProjectsArr = {this.props.changeToProjectsArr} 
                                projectDocChange = {this.props.projectDocChange} 
                                ImageSave = {this.props.ImageSave}  
														    RemoveImage = {this.props.RemoveImage}  
														    ChangeImage = {this.props.ChangeImage}  
														    SectionDelete= {this.props.SectionDelete} 
														    ImageDescriptionChange={this.props.ImageDescriptionChange}
                                />);


      var loadimg = (<LoadAnImage name = {this.props.name} s = {this.props.s} ImageSave = {this.props.ImageSave} docName = {this.props.docName} />);
      var changeIm = (<ChangeImage name = {this.props.name} s = {this.props.s} ChangeImage = {this.props.ChangeImage} docName = {this.props.docName} />);
      var editdes=(<EditDescription name = {this.props.name} s = {this.props.s}  pi = { this.props.pi}  docName = {this.props.docName} ImageDescriptionChange = {this.props.ImageDescriptionChange} img = {this.props.img} />);
      var removeimg = (<RemoveImage s = {this.props.s} pi = { this.props.pi} docName = {this.props.docName} img = {this.props.img} RemoveImage = {this.props.RemoveImage} />);
      

      switch(type) {
        case 'EditProjectDocument':
          content = editdocproject;
        break;
        case  'LoadAnImage':        
          content = loadimg;
        break;
        case 'ChangeImage':
          content = changeIm;
        break;
        case 'EditDescription':
          content = editdes;
        break;
        case 'RemoveImage':
          content = removeimg;
        break;
        default:
          content = (
            <div>                                        
              <h4> Unknown Type: {type} </h4>  <button onClick = {this.props.CloseModal} > okay </button>            
            </div>
            );
      } /// End Switch statement. 

 
    } else {
      content = (
      <div>                                        
        <h4>Unknown Message: {typeof message} </h4>    <button onClick = {this.props.CloseModal} > okay </button>          
      </div>
      );
    }

    
  

    return ( 
      <div className = 'modal'>   
        <div className = 'modal-content'>  
		      <button onClick = {this.props.CloseModal} className="close">&times;</button>                                
		      {content}
        </div>       
      </div> 
    );
  }
}

export default ModalAlert;