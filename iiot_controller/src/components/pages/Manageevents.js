import React, { Component } from 'react';
import '../../css/Manageevents.css';


class Manageevents extends Component {
  render() {	  
    return (
        <div className = 'content'>
     		<h2> Manage Events </h2>		 

			<p>
				<a href={this.props.signInUrl}><button> Click here to login </button></a>				
			</p>
        </div>
    );
  }
}


export default Manageevents;