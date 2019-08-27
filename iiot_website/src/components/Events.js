import React, { Component } from 'react';
import '../css/events.css';
import MyCalendar from './MyCalendar.js';


class Events extends Component {
  constructor(props) {
	super(props);
	

	var eves = [
		{ title: 'event 1', date: '2019-08-27' , st:'14:30:00', et:'10:00:00', description: 'This would be the description.' },
		{ title: 'event 2', date: '2019-08-28', st:'15:30:00', et:'09:00:00', description: 'This would be the description.' }
	  ];

	this.state = {
		date: new Date(),
		events:eves
	}


 
	
  }	
  onChange = date => this.setState({date})
  render() {

	var EList = this.state.events.map( (eve) => <li> {eve.title} - {eve.date} - start:{eve.st} end:{eve.et} {eve.description} </li>   );



    return (
        <div id = 'content'>
			<h2> Events </h2>		 			 
				<p> Up comming events. </p>
				<ol>
					{EList}
			 	</ol>
		 	<MyCalendar events = {this.state.events} />			 
        </div>
    );
  }
}

export default Events;
