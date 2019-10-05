import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './main.scss';

class MyCalendar extends Component {
  render() {	
    var outter = { fontSize:'14px' };
    var container = { margin: "3em 0 5em 0", height: "80vh",  maxWidth: '2200px' };
    return (
      <div style={outter}>
        <div style={container} >
              <FullCalendar 
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin ]}             
                header={{
                  left: 'prev today next',
                  center: 'title',
                  right: ''
                }}
                events={  this.props.events }
                height='parent'      
              />
        </div>
      </div>
    );
  }
}

export default MyCalendar;

 