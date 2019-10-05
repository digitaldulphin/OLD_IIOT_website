import React, { Component } from 'react';
import '../css/people.css';

class People extends Component {
  render() {
	var PeopleList = this.props.PeopleInfo.PeopleList.map( (p, i) => 
		<div className = {'peopleListItemLevel_'+p.ImportanceLevel } key={i}>
			<span> {p.Title} </span>: <span> {p.Name} </span>
		</div>	
	);
	var SponsorList = this.props.PeopleInfo.SponsorsList.map( (s, i) => 
		<div className = {'sponsorListItemLevel_'+s.ImportanceLevel } key={i}>
		  	<span> {s.Name} </span>
		</div>	
	);
    return (
        <div id = 'People_Page'>
     		<h2> People </h2>
		 	<div>
				{PeopleList}
			</div>
			<br /><br />
			<h2> Sponsors </h2>
			<div>
				{SponsorList}
			</div>
        </div>
    );
  }
}

export default People;
