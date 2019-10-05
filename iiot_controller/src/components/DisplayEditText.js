import React, { Component } from 'react';
 
 

class DisplayEditText extends Component {
  constructor(props) {
    super(props);
    this.state = {
        edit: false, text: this.props.text
    };
  }
  switchToEdit = () => {
    this.setState({ edit: true });
  }
  valChange = (e) => {
    var v = e.target.value;
    this.setState({ text: v });
  }
  Save = () => {
    var txt = this.state.text;
    this.setState({  edit: false  });    
    this.props.saveEdit(this.props.i, this.props.pi, this.props.LName, this.props.Type, txt );
  }
  render() {
    var show = ' ';
    var text = this.state.text;
    var Type = this.props.Type;
	
    var Display = ( 
        <span>
            {Type}: 
            {text} <button onClick = {this.switchToEdit} > Edit </button>
        </span>
    );
	
    var Edit  = (
        <span>
            {Type}: 
            <input type = 'text' value= {text} onChange = {this.valChange}></input> 
            <button onClick = {this.Save} > Save </button>
        </span>
    );

    if (this.state.edit == false ) {
        show = Display; 
    } else {
        show = Edit;
    }

    return ( 
        <div>
            {show} 
        </div>
    );
  }
}

export default DisplayEditText;