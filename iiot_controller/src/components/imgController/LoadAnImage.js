import React, { Component } from 'react';
import uuid from 'uuid';
import DisplayEditText from '../DisplayEditText.js';




class LoadAnImage extends Component {
constructor(props) {
	super(props);    
	this.state = {
	  preview:false, ImageDescription:'', s:this.props.s, pi: this.props.pi
	}
}
updateImageDisplay = (e) => {	  	  
	var curFiles = e.target.files;    
	if(curFiles.length === 0) {
		this.setState({preview:false});
	} else {
		var prawr = [];
		for(var i = 0; i < curFiles.length; i++) {  
			let pitem = {text: '', imgfile: null }      
			if(validFileType(curFiles[i])) {          
				pitem.txt = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
				pitem.imgfile = curFiles[i];
			} else {
				pitem.txt = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';          
			}
			prawr.push(pitem);
		}
		this.setState({preview:prawr});
	}
	function validFileType(file) {      
		const fileTypes = [ 'image/jpeg', 'image/pjpeg', 'image/png' ];
		for(var i = 0; i < fileTypes.length; i++) {
			if(file.type === fileTypes[i]) {
				return true;
			}
		}
		return false;
	}	
	function returnFileSize(number) {
		if(number < 1024) {
			return number + 'bytes';
		} else if(number >= 1024 && number < 1048576) {
			return (number/1024).toFixed(1) + 'KB';
		} else if(number >= 1048576) {
			return (number/1048576).toFixed(1) + 'MB';
		}
	}
}
saveEdit = (s, pi, LName, Type, txt) => {
	 
	console.log(s, pi, LName, Type, txt);
	this.setState({ ImageDescription:txt });    
}
submitImage = () => {  
	console.log(this.props);
	const that = this;
    const imgfile = this.state.preview[0].imgfile 
    var r = new FileReader();
    r.onload = () => {       		
		var img_as_DataURLlol = r.result;
		that.props.ImageSave(
			that.state.ImageDescription,
			that.props.s,
			that.props.pi,
			that.props.docName,
		 	img_as_DataURLlol,
			that.state.preview[0].imgfile.name
		);
    };
    r.readAsDataURL(imgfile);
}
render() {
    var loadeinsert = (
      <div>
        <label htmlFor="image_uploads">Choose images to upload (PNG, JPG)</label>    
        <input type="file" id="image" name="image"  accept="image/png, image/jpeg, image/jpg" onChange = {this.updateImageDisplay} />
      </div>
    );
    var labelInput = '';
    var pview = [];
    if (this.state.preview === false ){
		labelInput = loadeinsert;
		pview.push(<li key = {uuid.v4()} >No files currently selected for upload</li>);
    } else {
		if(this.state.preview.length === 0) {
			labelInput = loadeinsert;
			pview.push(<li key = {uuid.v4()} >No files currently selected for upload</li>);
		} else {     
			labelInput = ' '; 
			pview = [];
			var theParr = this.state.preview;        
			for(var i = 0; i < 1; i++) {  
				if (theParr[i].imgfile === null) {
					pview.push(<li key = {uuid.v4()} > <p>{theParr[i].txt}</p></li>);
				} else {            
					var LeImaage = new Image();        
					LeImaage.src = URL.createObjectURL( theParr[i].imgfile );          
					pview.push(
						<li key = {uuid.v4()} > 
						<p> {theParr[i].txt}</p>
				        <img src = { LeImaage.src  }  alt = {theParr[i].txt} />
						</li> 
					);
					pview.push(
						<div key = {uuid.v4()}>
						<h5>Add Description</h5> 
						<div className = "eee onepxsolidblack block marginOneAndThreeEm"   >
						<DisplayEditText 
							Type= {'Image Description'}   
							text = {this.state.ImageDescription}  
							saveEdit = {this.saveEdit} 
							i = {this.props.s}  
							LName = {'ImageDescription'}  
							/>              
						</div>
						</div>
					);           
					pview.push(
						<div key = {uuid.v4()} className = "eee onepxsolidblack block marginOneAndThreeEm" >
							<button onClick = {this.submitImage} > Submit </button>
						</div>
					);  
				}
			}
		}
    }
	return ( 
		<div>    
			{labelInput}
			<ol className="preview">
				{pview}
			</ol>
		</div> 
	);
}
}

export default LoadAnImage;