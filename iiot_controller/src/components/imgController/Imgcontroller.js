import React, { Component } from 'react';
import EditImageModal from './EditImageModal.js';
import MYImg from '../MYImg.js';
 

class Imgcontroller extends Component {
    constructor(props) {
        super(props);
        this.state = { m:false }
    }
    removeImage = () => {
      this.setState({ m: { type:'RemoveImage', name:this.props.img.ImageName, s:this.props.s, pi:this.props.pi} });
    }
    LoadAnImage = () => {       
	  this.setState({ m:{ type:'LoadAnImage', name:false, s:this.props.s, pi:this.props.pi } });
    }
    ChangeImage = () => {       
      this.setState({ m:{ type:'ChangeImage', name:this.props.img.ImageName, s:this.props.s, pi:this.props.pi}  });
    }
    EditDescription = () => {            
      this.setState({ m:{ type: 'EditDescription', name:false, s:this.props.s, pi:this.props.pi } });
    }
    cancel = () => {       
      this.setState({ m: false });
    }
    render() {
		//console.log( 's = {'+this.props.s+'} pi = {'+this.props.pi+'}'); 
		var content = ' '; var modal = ' ';                              
		if ( this.state.m !== false) {
			modal = <EditImageModal 
						docName = {this.props.docName} 
                        cancel = {this.cancel} 
                        type={this.state.m.type} 
                        name={this.state.m.name} 
						s={this.state.m.s} 
						pi={this.state.m.pi}
                        OpenModalAlert = {this.props.OpenModalAlert} 
                        ImageSave = {this.props.ImageSave}
                        img = {this.props.img}                            
                        RemoveImage = {this.props.RemoveImage}
                        ChangeImage = {this.props.ChangeImage}
                        ImageDescriptionChange = {this.props.ImageDescriptionChange}
                        />
		}       
		if (this.props.img.ImageName === false ) {
			content =  ( 
				<div> 
				<div> No image </div> 
				<div><button onClick = {this.LoadAnImage}> Load an image. </button></div>
				</div> 
			); 
		} else {          						
				var impat = '../../../../iiot_backend/images/'+this.props.img.ImageName+'';								
				var iname = this.props.img.ImageName;
				var descip = this.props.img.ImageDescription;
				var An_Img = <MYImg ImageName = {iname} ImageDescription = {descip} />;		        
				content = (
					<div> 
					  <div>Image: {this.props.img.ImageName}</div> 
				      <div className = 'section_Img_Continer' >
					    {An_Img}
					    <div className = 'textImg'> {this.props.img.ImageDescription} </div>
				      </div>    
				      <div>
					    <button onClick = {this.ChangeImage}  > Change Image </button>
						<button onClick = {this.removeImage} > Remove Image </button>
						<button onClick = {this.EditDescription}> Edit Description</button> 
				      </div>
				    </div>
			    );				 
			
		}
        return (
			<div className = 'Imgcontroller' >
			  <h4> Section Image</h4>
			  {content}
			  {modal}
			</div>
		);
	}
}


export default Imgcontroller;