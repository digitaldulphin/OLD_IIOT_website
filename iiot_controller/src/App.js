import React, { Component } from 'react';
import TheHeader from './components/Thesetup/TheHeader.js';
import TheMain from './components/Thesetup/TheMain.js';
import caller from './caller.js';
import './css/Global.css';
import ModalAlert from './components/ModalAlert.js';


import {
  BrowserRouter as Router,
} from 'react-router-dom';
// eslint-disable-next-line
import { throwStatement } from '@babel/types';  


class App extends Component {
  constructor(props) {
    super(props);	
	/** 
	The State object explained for app.j.
	- AppData is false on inital load, so the app's contents doesnt get rendered untill /GetInfo returns 
		in componentDidMount function.	When changes are made to AppData the app should write to the json 
		file then update state.		
		
	- Modal Alert is suppose to replace anytime the window.alert function gets used.
		It should be used for img controller, and every other time a modal is need.
		This functionality of modal alert should be considered to be implemented.
	- MAmessage means modal alert message. it is the message for the modal alert component.	
		May get removed. Dependeding on how Modal Alert gets implemented.
		
	*/	
    this.state = {
      AppData: false,	MAmessage:' ',	ModalAlert:false     
    };
  }
  componentDidMount() {   
	/**
		Grabs appdata so it can be rendered and also edited.
	*/
    caller.GET( '/GetInfo', (data) => {
      var appdata = JSON.parse( data );           
      this.setState({
        AppData: appdata      
      });
    });
   
  }
  
  
  
  
  
  /* Function Reload
		Allows app to reload AppData when necessary. Dont think it is used.
		Might remove.
  */
  reload = () => {
    caller.GET( '/GetInfo', (data) => {
      var appdata = JSON.parse( data );            
      this.setState({
        AppData: appdata      
      });
    });
  }
  OpenModalAlert = (message) => {
    this.setState({
      MAmessage:message,
      ModalAlert:true
    });
  }
  CloseModalAlert = () => {
    this.setState({
      MAmessage:' ',
      ModalAlert:false
    });
  }
  
  
  /** Function ChangeOfPeopleInfo
		When the people info gets changed.
		Update the current AD in the state with the new people list 
		and sent that AD to SaveData. This might cause a problem with unsaved work
		and unintented overwrites if the state is different that what it is suppose to be.		
  */
  ChangeOfPeopleInfo = (nmjjkkllll) => {
    var AD = this.state.AppData;
	console.log(nmjjkkllll);
    AD.PeopleInfo = nmjjkkllll; 		
	caller.POST( AD, '/controller/SaveData', (data) => {
      var appdata = JSON.parse( data );  
      this.setState({
        AppData: appdata      
      });
	});	
  }
  
  
  
  /** function SectionDelete 
		When a scrtion gets deleted in about document or a projects document.
		Not tested with Projects document.
  */
  SectionDelete = (s, pi, docName, ImageName ) => {
    var pack = {
      s: s, pi: pi, docName:docName, ImageName:ImageName
    }
	console.log(pack);
    caller.POST( pack, '/controller/SectionDelete', (data) => {			
      var appdata = JSON.parse( data );         
      this.setState({
        AppData: appdata      
      });
	});	
  }
  
  
  
  /** function AboutdocChange
		When ever the about document a change that dont relate to the images.
  */
  AboutdocChange = (UpdatedAboutDoc) => {
    var AD = this.state.AppData;
    AD.AboutPage.doc = UpdatedAboutDoc;         
    caller.POST( AD, '/controller/SaveData', (data) => {
      var appdata = JSON.parse( data );  
      this.setState({
        AppData: appdata      
      });
	});	
  }
  
  
  
  /** function ImageSave.
	pack should be created in function not as a parameter.
	pack should be created like in fun RemoveImage and func ImageDescriptionChange	
  */
  ImageSave = ( ImageDescription, s, pi, docName, TheImgFileAs_a_DataURL, ImageName) => {     
    var pack = {ImageDescription:ImageDescription, s:s, pi:pi, docName:docName, TheImgFileAs_a_DataURL:TheImgFileAs_a_DataURL, ImageName:ImageName}         
    caller.POST(pack, '/controller/LoadImage', (data) => {
      var appdata = JSON.parse( data );         
      this.setState({
        AppData: appdata      
      });
    });
  }
  
  
  
  /** function ChangeImage.
    	pack should be created in function not as a parameter.
	    pack should be created like in fun RemoveImage and func ImageDescriptionChange	
  */
  ChangeImage = ( ImageDescription,  s, pi, docName, TheImgFileAs_a_DataURL, ImageName ) => {        
    var pack = {
      ImageDescription: ImageDescription, s: s, pi:pi, docName: docName, TheImgFileAs_a_DataURL:TheImgFileAs_a_DataURL, ImageName: ImageName
    }        
    caller.POST(pack, '/controller/ChangeImages', (data) => {
      var appdata = JSON.parse( data );            
      this.setState({
        AppData: appdata      
      });
    });
  }
  
  
  
  /** function RemoveImage
      Handles removing images from about document or slide show.
    	Eventually will handle image removals of project documents.
  */
  RemoveImage = (s, img, docName, p) => {
  
    var pack = {
      s: s,  ImageName: img.ImageName,  docName: docName, p:p  
    }
    
    caller.POST(pack, '/controller/RemoveImage', (data) => {
      var appdata = JSON.parse( data );            
      this.setState({
        AppData: appdata      
      });
    });
  }



  /** Function ImageDescriptionChange.
	    Handles updates to an ImageDescriptionChange for about document 
	    slide show. Eventually projects will be included.
  */
  ImageDescriptionChange = (s,  pi,  docName, type, txt ) => {
    var pack = {
      s: s,  ImageDescription: txt,  docName: docName, pi: pi
    }
    console.log('v '+txt);
    console.log('type '+ type);
    console.log(pack);
    caller.POST(pack, '/controller/ImageDescriptionChange', (data) => {
      var appdata = JSON.parse( data );            
      this.setState({
        AppData: appdata      
      });
    });
  }
  
  
  
  changeToProjectsArr = ( projarry ) => {
    var AD = this.state.AppData;
    AD.projects = projarry;         
    caller.POST( AD, '/controller/SaveData', (data) => {
      var appdata = JSON.parse( data );  
      this.setState({
        AppData: appdata      
      });
	});	
  }

  projectDocChange = ( doc, pi ) => {
    var AD = this.state.AppData;
    AD.projects[pi].doc = doc;         
    caller.POST( AD, '/controller/SaveData', (data) => {
      var appdata = JSON.parse( data );  
      this.setState({
        AppData: appdata      
      });
	});	
  }
  

  /** Func ProjTitleSave
   *  When a project title gets changed.
   *  Funneled threw SaveData Route.
   */
  ProjTitleSave = (pi , i, LName, Type, txt) => {
    var AD = this.state.AppData;
    console.log(i , pi, LName, Type, txt);
    AD.projects[pi].Title = txt;         
    caller.POST( AD, '/controller/SaveData', (data) => {
      var appdata = JSON.parse( data );  
      this.setState({
        AppData: appdata      
      });
	});	
  }
  /** Func ProjDescSave
   *  When a project description gets changed.
   *  Funneled threw SaveData Route.
   */
  ProjDescSave = (pi , i, LName, Type, txt) => {
    var AD = this.state.AppData;
    console.log(i , pi, LName, Type, txt);
    AD.projects[pi].Description = txt;        
    caller.POST( AD, '/controller/SaveData', (data) => {
      var appdata = JSON.parse( data );  
      this.setState({
        AppData: appdata      
      });
	});	
  }

  saveEmail = (txt) => {
    let obj = { 
      email: txt
    };
    caller.POST( obj, '/controller/emailSave', (data) => {      
      if (data === "EMAIL INVALID") {
        this.setState({
          ModalAlert:true,
          MAmessage: 'Email is invalid.' 
        });
      } else {
        var appdata = JSON.parse( data );          
        this.setState({
          AppData: appdata      
        });
      }     
    });	
  }
  
  /** Function render() 
		On inital render appdata is not available so main content doesnt get 
		shown. After function componentDidMount, TheMain gets rended.
		When ModalAlert is needed it renders here.
  */
  render() {

    var main = '';
    if(this.state.AppData === false    ){
      main = ' ';
    } else {       
      main = (<TheMain 
				    AppData = {this.state.AppData} 
					reload ={this.reload}   
					OpenModalAlert = {this.OpenModalAlert} 
					ChangeOfPeopleInfo = {this.ChangeOfPeopleInfo} 
					AboutdocChange = {this.AboutdocChange}
				    ImageSave = {this.ImageSave} 
					RemoveImage ={this.RemoveImage}  
					ChangeImage = {this.ChangeImage} 
					ImageDescriptionChange = {this.ImageDescriptionChange}  
					SectionDelete = {this.SectionDelete} 
          changeToProjectsArr = {this.changeToProjectsArr} 
          
                  />);
    }
    var MA = ' ';
    if (this.state.ModalAlert !== false) {
      MA = (<ModalAlert 
                ProjTitleSave = {this.ProjTitleSave}
                ProjDescSave = {this.ProjDescSave}
                AppData = {this.state.AppData} 
                message = {this.state.MAmessage}                  
                CloseModal ={this.CloseModalAlert}
                changeToProjectsArr = {this.changeToProjectsArr} 
                projectDocChange = {this.projectDocChange}
                ImageSave = {this.ImageSave}  
                RemoveImage = {this.RemoveImage}  
                ChangeImage = {this.ChangeImage}  
                SectionDelete= {this.SectionDelete} 
                ImageDescriptionChange={this.ImageDescriptionChange}
                />);
    } 
    return (
      <div id="AppContainer">
        <Router>
          <TheHeader />
          {main}         
        </Router> 
        {MA}
      </div>
    );
  }
}

export default App;
