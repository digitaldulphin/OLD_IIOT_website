import React, { Component } from 'react';
import '../css/Manageabout.css';
import caller from '../caller.js';
import Editdocument from './Editdocument.js';

 

class Manageabout extends Component {
	constructor(props) {
		super(props);

 
	
		this.state = {
		  SlideShowImg: '',
		  document: []
		};
	
	  }
	  
	  componentDidMount() {
		caller.GET( '/GetAboutInfo', cb, this   );
		function cb(data, that) {
			console.log(data);
		  var stuff = JSON.parse( data );
		  var document = stuff.document;
		  that.setState({ 
			SlideShowImg: stuff.img,
			document: document
		  });
		}
	} 
	saveDocument = () => {
		var doc = this.state.document;
		console.log( doc );
		function cb(data, that) {
			alert('About document saved.');					
		}
		caller.POST( doc, '/SaveAboutDocument', cb, this );	
	  }
	addNewSection = () => {
		var section = { heading: " ", img: " ", paragraphs: [ " " ] };
		var doc = this.state.document;
		doc.push(section);
		this.setState({
			document: doc
		});
	}
	sectionDelete = ( i ) => {
		var document = this.state.document;
		document.splice( i , 1);
		if( document.length == 0   ) {
			var section = { heading: " ", img: " ", paragraphs: [ " " ] };
			var doc = this.state.document;
			doc.push(section);
			this.setState({
				document: doc
			});
		}
		else {
			this.setState({ 
				document: document
			});
		}
	}
	deleteParag = ( i, s) => {
		var document = this.state.document;

		var paras = document[s].paragraphs;
		paras.splice( i , 1);
		if( paras.length == 0   ) {
		  this.sectionDelete( s );
		}
		else {
		  document[s].paragraphs = paras
		  this.setState({ 
			document: document
		  });
		}
	  }
	  addaParagraph = (s) => {
		var document = this.state.document;
		document[s].paragraphs.push(" ");	 
		
		this.setState({ 
			document: document
		});
	  }
	  headerChange = (e, s) => {
		var document = this.state.document;
		



		document[s].header  = e.target.value
		this.setState({document: document });

	  }
  render() {
	var doc = this.state.document;
	console.log( 'document '+JSON.stringify( doc ));
    return (
        <div id = 'content'>
     		<h2> Manage About </h2>		 
			<div id = 'SetImageInterface' >
				<h3> Change Main Image </h3>
				<p>
					File Upload. Must have an aspect ratio of 16:9. 
				</p>
				<div id = 'PrevieContainterImage'>
					... Image Preview ...
				</div>
				<button> Save </button>
			</div>
			<div> 
				<Editdocument   document={ doc } addNewSection = {this.addNewSection} sectionDelete = {this.sectionDelete}  addaParagraph = {this.addaParagraph} 
								deleteParag = {this.deleteParag}  headerChange = {this.headerChange}  saveDocument = {this.saveDocument} 
								
								
					/>				
			</div>
        </div>
    );
  }
}

export default Manageabout;




 