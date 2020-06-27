import React, { Component } from 'react';
import Manageabout from '../pages/Manageabout.js'
import Manageprojects from '../pages/Manageprojects.js'
import Managepeople from '../pages/Managepeople.js'
import Manageevents from '../pages/Manageevents.js'
 
 


import {
  BrowserRouter as 
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
// eslint-disable-next-line
import { throwStatement } from '@babel/types';  



class TheMain extends Component {
	render() {
		var AboutInfo = this.props.AppData.AboutPage;    
		var ProjeInfo = this.props.AppData.projects;
		var PeopleInfo = this.props.AppData.PeoplePage;
		var EventInfo = this.props.AppData.EventList;
		var signInUrl = this.props.AppData.signInUrl;
return (
      
<main>
<Switch>
<Route exact path='/manageAbout' render={(props) => <Manageabout {...props} 
														AboutInfo = {AboutInfo}  
														CloseModalAlert ={this.props.CloseModalAlert}  
														OpenModalAlert = {this.props.OpenModalAlert}
														AboutdocChange = {this.props.AboutdocChange} 
														ImageSave = {this.props.ImageSave}  
														RemoveImage = {this.props.RemoveImage}  
														ChangeImage = {this.props.ChangeImage}  
														SectionDelete= {this.props.SectionDelete} 
														ImageDescriptionChange={this.props.ImageDescriptionChange}
														/>}/>  


<Route path='/manageProjects'  render={(props) => <Manageprojects {...props} 
														ProjeInfo = {ProjeInfo} 
														CloseModalAlert = {this.props.CloseModalAlert}  
														OpenModalAlert = {this.props.OpenModalAlert}
														changeToProjectsArr = {this.props.changeToProjectsArr}
														ImageSave = {this.props.ImageSave}  
														RemoveImage = {this.props.RemoveImage}  
														ChangeImage = {this.props.ChangeImage}  
														SectionDelete= {this.props.SectionDelete} 
														ImageDescriptionChange={this.props.ImageDescriptionChange}

														/>} />
														
<Route path='/managePeople' render={(props) => <Managepeople {...props}      
													PeopleInfo = {PeopleInfo} 
													CloseModalAlert ={this.props.CloseModalAlert}  
													OpenModalAlert = {this.props.OpenModalAlert} 
													ChangeOfPeopleInfo = {this.props.ChangeOfPeopleInfo} 
													/>  } />
													
<Route path='/manageEvents' render={(props) => <Manageevents {...props}      
													EventInfo = {EventInfo}  
													CloseModalAlert ={this.props.CloseModalAlert} 
													OpenModalAlert = {this.props.OpenModalAlert}													
													signInUrl = {signInUrl}
													/>} />        
													
<Route render={() => (
 <Redirect to='/manageAbout' />
)} />
</Switch>                 
</main>

);


  }
}

export default TheMain;
