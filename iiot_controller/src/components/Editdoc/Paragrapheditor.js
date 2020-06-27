import React, { Component } from 'react';


class Paragrapheditor extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.p, edit: false }
  }
  switchToEdit = () => {
    this.setState({ edit: true });
  }
  valChange = (e) => {
    this.setState({value: e.target.value});
  }
  Save = () => {
    var txt = this.state.value;
    this.setState({ edit: false });     
    this.props.saveEdit(this.props.i, this.props.s, txt );
  }
  render() {
    var outputterer = '';
    var editor = (    
      <div>          
          <textarea value={this.state.value} onChange={ this.valChange } />    
          <button onClick = {this.Save} > Save </button>
          <button onClick = {() => this.props.deleteParag( this.props.i, this.props.s)} > Delete Paragraph </button>
      </div>
    );
	
    var displayP  = (
      <div>
        <p> {this.props.p} </p>
        <button onClick = {this.switchToEdit} >Edit</button>
      </div>
    );

    if (this.state.edit === false ) {
      outputterer = displayP; 
    } else {
      outputterer = editor;
    }

    return (    
        <div className = 'Paragrapheditor'>
          <h3> Paragraph: </h3>
          {outputterer}
        </div>
    );
  }
}

export default Paragrapheditor;