import React, { Component } from 'react';
import '../../css/Managepeople.css';
import RankListItem from '../RankListITem.js';
import uuid from "uuid";


class Managepeople extends Component {
	moveDown = (i, LName) => {
		var new_index = i +1;
		var old_index = i;
		var MyArr = [];    
		if (LName === 'PeopleList') {        
			MyArr =  this.props.PeopleInfo.PeopleList;
			if ( new_index >= MyArr.length ) 
			{ new_index = 0; }
			MyArr.splice(new_index, 0, MyArr.splice(old_index, 1)[0]);     
			this.props.ChangeOfPeopleInfo( { 
				PeopleList: MyArr, 
				SponsorsList: this.props.PeopleInfo.SponsorsList 
			});
		} else if (LName === 'SponsorsList' ) {        
			MyArr =  this.props.PeopleInfo.SponsorsList;
			if ( new_index >= MyArr.length )
			{ new_index = 0; }
			MyArr.splice(new_index, 0, MyArr.splice(old_index, 1)[0]);
			this.props.ChangeOfPeopleInfo({ 
				PeopleList: this.props.PeopleInfo.PeopleList,
				SponsorsList: MyArr
			});
		}
	}
	moveUp = (i, LName) => {
		var new_index = i - 1;
		var old_index = i;
		var MyArr = [];    
		if (LName === 'PeopleList') {        
			MyArr =  this.props.PeopleInfo.PeopleList;
			if ( new_index < 0 ) 
			{ new_index = MyArr.length - 1; }
			MyArr.splice(new_index, 0, MyArr.splice(old_index, 1)[0]);     
			this.props.ChangeOfPeopleInfo({ 
				PeopleList: MyArr, 
				SponsorsList: this.props.PeopleInfo.SponsorsList 
			});
		} else if (LName === 'SponsorsList' ) {        
			MyArr =  this.props.PeopleInfo.SponsorsList;
			if ( new_index < 0 ) 
			{ new_index = MyArr.length - 1; }
			MyArr.splice(new_index, 0, MyArr.splice(old_index, 1)[0]);
			this.props.ChangeOfPeopleInfo({ 
				PeopleList: this.props.PeopleInfo.PeopleList,
				SponsorsList: MyArr
			});
		}
	}
	delListItem = ( i, LName ) => {
		var MyArr = [];
		if (LName === 'PeopleList') {        
			MyArr =  this.props.PeopleInfo.PeopleList;
			MyArr.splice(i, 1);     
			this.props.ChangeOfPeopleInfo( { 
				PeopleList: MyArr, 
				SponsorsList: this.props.PeopleInfo.SponsorsList 
			});
		} else if (LName === 'SponsorsList' ) {        
			MyArr =  this.props.PeopleInfo.SponsorsList;      
			MyArr.splice(i, 1);
			this.props.ChangeOfPeopleInfo({ 
				PeopleList: this.props.PeopleInfo.PeopleList,
				SponsorsList: MyArr
			});
		}
	}
	ImportanceChange = (e, i, LName) => {
		var L = e.target.value;    
		var MyArr = [];
		if (LName === 'PeopleList') {        
			MyArr =  this.props.PeopleInfo.PeopleList;
			MyArr[i].ImportanceLevel = L;
			this.props.ChangeOfPeopleInfo( { 
				PeopleList: MyArr, 
				SponsorsList: this.props.PeopleInfo.SponsorsList 
			});
		} else if (LName === 'SponsorsList' ) {        
			MyArr =  this.props.PeopleInfo.SponsorsList;      
			MyArr[i].ImportanceLevel = L;
			this.props.ChangeOfPeopleInfo({ 
				PeopleList: this.props.PeopleInfo.PeopleList,
				SponsorsList: MyArr
			});
		}
	}
	AddPeopleList = () => {
		var MyArr =  this.props.PeopleInfo.PeopleList;    
		var peobk = { Name:"Person's name ", Title:"Person's title ", ImportanceLevel:5 };
		MyArr.push(peobk);
		this.props.ChangeOfPeopleInfo( { 
			PeopleList: MyArr, 
			SponsorsList: this.props.PeopleInfo.SponsorsList 
		});
	}
	AddSponsorsList = () => {
		var MyArr =  this.props.PeopleInfo.SponsorsList;
		var spojv = { Name:"Sponsor's name ", ImportanceLevel:5 };
		MyArr.push(spojv);
		this.props.ChangeOfPeopleInfo( { 
			PeopleList: this.props.PeopleInfo.SponsorsList,
			SponsorsList: MyArr        
		});
	}
	saveEdit = (i, pi, LName, Type, txt) => {
		console.log(i, pi, LName, Type, txt);
		var MyArr = [];
		if (LName === 'PeopleList') {        
			MyArr =  this.props.PeopleInfo.PeopleList;    
			if (Type === 'Title' ) {        
				MyArr[i].Title = txt; 
			} else if (Type === 'Name') {
				MyArr[i].Name = txt;
			}
			this.props.ChangeOfPeopleInfo( { 
				PeopleList: MyArr, 
				SponsorsList: this.props.PeopleInfo.SponsorsList 
			});
		} else if (LName === 'SponsorsList' ) {        
			MyArr =  this.props.PeopleInfo.SponsorsList;      
			MyArr[i].Name = txt;
			console.log(txt);
			this.props.ChangeOfPeopleInfo({ 
				PeopleList: this.props.PeopleInfo.PeopleList,
				SponsorsList: MyArr
			});
		}
	}
	render() {
		var peopleinfo = this.props.PeopleInfo; 
		var pList = peopleinfo.PeopleList.map( (pp, i) =>
			<RankListItem 
				ooobj = {pp} 
				i = {i} 
				key = {uuid.v4()} 
				moveUp  = {this.moveUp}
				delListItem = {this.delListItem}
				moveDown = {this.moveDown}  
				LName = {'PeopleList'} 
				ImportanceChange = {this.ImportanceChange}
				saveEdit = {this.saveEdit}
				/> 
		);
		var sponsList = peopleinfo.SponsorsList.map( (sp, i) => 
			<RankListItem  
				ooobj = {sp} 
				i = {i} 
				key = {uuid.v4()}
				moveUp  = {this.moveUp}  
				delListItem = {this.delListItem}
				moveDown = {this.moveDown}  
				LName = {'SponsorsList'} 
				ImportanceChange = {this.ImportanceChange}
				saveEdit = {this.saveEdit}
				/>
		);  
		return (
			<div className = 'content'>
				<h2> Manage People </h2>
				<div className = 'EditPeopleList' > 
					<h4> People </h4>
					{pList}
					<button onClick = {this.AddPeopleList} > Add Person </button>
				</div>
				<div className = 'EditPeopleList' >
					<h4>Sponsors</h4> 
					{sponsList}
					<button onClick = {this.AddSponsorsList} > Add Sponsor </button>
				</div>
			</div>
		);
	}
}


export default Managepeople;