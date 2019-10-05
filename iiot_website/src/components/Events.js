import React, { Component } from 'react';
import '../css/events.css';
import MyCalendar from './MyCalendar.js';
import Event from './Event.js'

class Events extends Component {
  constructor(props) {
	super(props);
	this.state = {
		date: new Date()
	}
  }
  onChange = date => this.setState({date})
  render() {
	var EList = this.props.EventList.map( (eve, i) => 
		<Event eve={eve} key = {i}/>
	);
    return (
        <div id = 'Events_Page'>
			<h2> Events </h2>		 			 
				<p> Up comming events. </p>
				<ul id = 'eventslist'>
					{EList}
			 	</ul>
		 	<MyCalendar events = {this.props.events} />			 
        </div>
    );
  }
}

export default Events;
