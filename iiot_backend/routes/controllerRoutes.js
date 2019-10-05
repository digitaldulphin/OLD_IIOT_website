const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const CONFIG = require('../config.js');
const HOMEURL = CONFIG.HOMEURL;
const MYHELPERS = require('../myhelpers.js');
const CONTROLLER = require('../controllers/controller_ctrl.js');
const APPDATA = require('../AppData.js');

/** controller Routes
	8 Routes at the moment.
	
	/static
	/
	/controller/RemoveImage
	/controller/ChangeImages
	/SaveData
	/controller/ImageDescriptionChange
	/controller/LoadImage
	/controller/SectionDelete

*/












ROUTER.use('/static', EXPRESS.static(PATH.join(__dirname, '../', '../', 'iiot_controller', 'build', 'static')));

ROUTER.get('/',  function(req, res) {		 
	res.sendFile(  PATH.join(__dirname, '../', '../', 'iiot_controller', 'build', 'index.html' ));
});

    
	


 

//ROUTER.use('/', EXPRESS.static(PATH.join(__dirname, '../', 'private', 'build')));
//// Get employeeApp, send menu for now.
/*
ROUTER.get('/', ensureAuthenticated, function(req, res) { console.log(" get /controller ");
	res.sendFile(  PATH.join(__dirname, '../', '../', 'iiot_controller', 'build', 'index.html' ));
});

ROUTER.use('/static', EXPRESS.static(PATH.join(__dirname, '../', '../', 'iiot_controller', 'build', 'static')   ));
*/

 



ROUTER.post('/controller/RemoveImage', (req, res) => { console.log('POST to RemoveImage');	
	var s = req.body.s;
	var p = req.body.p;
	var ImageName = req.body.ImageName;
	var docName = req.body.docName;	
	APPDATA.RemoveAnImage(ImageName); 	
	var AD = APPDATA.readADfile();
	if (docName === "Aboutdoc") {
		AD.AboutPage.doc[s].img.ImageName = false;	
		AD.AboutPage.doc[s].img.ImageDescription =  false;	
	 	AD.AboutPage.doc[s].img.alt =  false;	
	}
	if (docName === 'SlideShow' ) {				
		AD.AboutPage.SlideShowImg.ImageName = false;	
		AD.AboutPage.SlideShowImg.ImageDescription = false;		 			
		AD.AboutPage.SlideShowImg.alt = false;	
	}	
	if (docName === 'Main_Project_Image') { 
		AD.projects[p].img.ImageName = false;	
		AD.projects[p].img.ImageDescription = false;				
		AD.projects[p].img.alt = false;
	}
	if ( docName === 'Project_Doc_Image') {		
		AD.projects[p].doc[s].img.ImageName = false;	
		AD.projects[p].doc[s].img.ImageDescription = false;				
		AD.projects[p].doc[s].img.alt = false;		
	}	
	APPDATA.saveAppData(AD, (err) => {		
		if (err === 'GOOD') {
			let ad = APPDATA.readADfile();
			res.send(JSON.stringify(ad));		
		} else {				
			res.send('COMPUTER ERROR');
		}		
	});
});






ROUTER.post('/controller/ChangeImages', (req, res) => { console.log('POST to ChangeImages');	
	var docName = req.body.docName;
	var TheImgFileAs_a_DataURL = req.body.TheImgFileAs_a_DataURL;
    var ImageDescription = req.body.ImageDescription;
    var s = req.body.s;
	var ImageName = req.body.ImageName;
	var p = req.body.pi;
    console.log( docName, s, ImageName,ImageDescription, p );	
	var AD = APPDATA.readADfile();	
	if (docName === "Aboutdoc") {		
		var oldImage = AD.AboutPage.doc[s].img.ImageName;		
		APPDATA.RemoveAnImage(oldImage); 	
		AD.AboutPage.doc[s].img.ImageName = ImageName;	
		AD.AboutPage.doc[s].img.ImageDescription =  ImageDescription;	
	}		
	if (docName === 'SlideShow' ) {
		var oldImage = AD.AboutPage.SlideShowImg.ImageName ;		
		APPDATA.RemoveAnImage(oldImage); 	
		AD.AboutPage.SlideShowImg.ImageName = ImageName;	
		AD.AboutPage.SlideShowImg.ImageDescription = ImageDescription;		 			
	}	
	if (docName === 'Main_Project_Image') {
		var oldImage = AD.projects[p].img.ImageName;		
		APPDATA.RemoveAnImage(oldImage); 
		AD.projects[p].img.ImageName = ImageName;	
		AD.projects[p].img.ImageDescription = ImageDescription;				
		AD.projects[p].img.alt = ImageDescription;
	}
	if ( docName === 'Project_Doc_Image') {		
		var oldImage = AD.projects[p].doc[s].img.ImageName;	
		APPDATA.RemoveAnImage(oldImage); 
		AD.projects[p].doc[s].img.ImageName = ImageName;	
		AD.projects[p].doc[s].img.ImageDescription = ImageDescription;				
		AD.projects[p].doc[s].img.alt = ImageDescription;		
	}
	var base64data = TheImgFileAs_a_DataURL.split(',');
	if ( base64data.length === 2 ) {		
		var fs = require("fs");
		fs.writeFile(  "images/"+ImageName, base64data[1], 'base64', function(err) {			
			APPDATA.saveAppData(AD, (err) => {	
				console.log(err);
				if (err === 'GOOD') {
					let ad = APPDATA.readADfile();
					res.send(JSON.stringify(ad));		
				} else {				
					res.send('COMPUTER ERROR');
				}		
			});					
		});		
	}	
});






ROUTER.post('/SaveData', (req, res) => { console.log(" POST to Save Data" ); 
	var nAD =  req.body;
	APPDATA.saveAppData(nAD, (err) => {		
		if (err === 'GOOD') {
			let ad = APPDATA.readADfile();
			res.send(JSON.stringify(ad));		
		} else {				
			res.send('COMPUTER ERROR');
		}		
	});
});





ROUTER.post('/controller/ImageDescriptionChange', (req, res) => { console.log(" POST to Save Data" );  
	var s = req.body.s;
	var p = req.body.pi;
	var ImageDescription = req.body.ImageDescription;
	var docName = req.body.docName;
	console.log(req.body);	
	var AD = APPDATA.readADfile();
	if (docName === "Aboutdoc") {		
		AD.AboutPage.doc[s].img.ImageDescription =  ImageDescription;		 	
	}
	if (docName === 'SlideShow' ) {				
		AD.AboutPage.SlideShowImg.ImageDescription = ImageDescription;		 			
	}	
	if (docName === 'Main_Project_Image') {		
		AD.projects[p].img.ImageDescription = ImageDescription;						
	}
	if ( docName === 'Project_Doc_Image') {		 		
		AD.projects[p].doc[s].img.ImageDescription = ImageDescription;				
	}	
	APPDATA.saveAppData(AD, (err) => {		
		if (err === 'GOOD') {
			let ad = APPDATA.readADfile();
			res.send(JSON.stringify(ad));		
		} else {				
			res.send('COMPUTER ERROR');
		}		
	});	
});



 
ROUTER.post('/controller/LoadImage', (req, res) => { console.log(" POST to LoadSectionImage " ); 
	var reqbody =  req.body;	
	var docName = req.body.docName;
	var TheImgFileAs_a_DataURL = req.body.TheImgFileAs_a_DataURL;
    var ImageDescription = req.body.ImageDescription;
    var s = req.body.s;
	var p = req.body.pi;
	var ImageName = req.body.ImageName;    	
	 
	var AD = APPDATA.readADfile();	
	if (docName === 'Aboutdoc' ) {
		AD.AboutPage.doc[s].img.ImageName = ImageName;	
		AD.AboutPage.doc[s].img.ImageDescription =  ImageDescription;		 			
	}		
	if (docName === 'SlideShow' ) {
		AD.AboutPage.SlideShowImg.ImageName = ImageName;	
		AD.AboutPage.SlideShowImg.ImageDescription = ImageDescription;		 			
	}	
	
	if (docName === 'Main_Project_Image') {
		AD.projects[p].img.ImageName = ImageName;	
		AD.projects[p].img.ImageDescription = ImageDescription;						
	}
	if ( docName === 'Project_Doc_Image') {		 
		AD.projects[p].doc[s].img.ImageName = ImageName;	
		AD.projects[p].doc[s].img.ImageDescription = ImageDescription;				
	}
	
	var base64data = TheImgFileAs_a_DataURL.split(',');
	if ( base64data.length === 2 ) {		
		var fs = require("fs");
		fs.writeFile(  "images/"+ImageName, base64data[1], 'base64', function(err) {			
			APPDATA.saveAppData(AD, (err) => {		
				if (err === 'GOOD') {
					let ad = APPDATA.readADfile();
					res.send(JSON.stringify(ad));		
				} else {				
					res.send('COMPUTER ERROR');
				}		
			});					
		});		
	}	
});
 


ROUTER.post('/controller/SectionDelete', (req, res) => { console.log(" POST to SectionDelete" ); 
	console.log(req.body);
	var s = req.body.s;
	var pi = req.body.pi;
	var ImageName = req.body.ImageName;
	var docName = req.body.docName;		
	if(ImageName !== false){
		APPDATA.RemoveAnImage(ImageName); 	
	}
	var CurrentFullApp_Data = APPDATA.readADfile();			
	if (docName === 'Aboutdoc') {			 	
		var doc = CurrentFullApp_Data.AboutPage.doc;
		doc.splice(s, 1);
		if( doc.length == 0   ) {
			var section = { heading: " ", img: {ImageName:false, ImageDescription:false}, paragraphs: [ " " ] };			
			doc.push(section);
		}
		CurrentFullApp_Data.AboutPage.doc = doc;
		save(CurrentFullApp_Data);			 	
	}	 
	if ( docName === 'Project_Doc_Image' ) {		 		
		var doc = CurrentFullApp_Data.projects[pi].doc;
		doc.splice(s, 1);
		if( doc.length == 0   ) {
			var section = { heading: " ", img: {ImageName:false, ImageDescription:false}, paragraphs: [ " " ] };			
			doc.push(section);
		}
		CurrentFullApp_Data.projects[pi].doc = doc;
		save(CurrentFullApp_Data);						
	}


	
	function save(NextAD) {
		APPDATA.saveAppData(NextAD, (err) => {		
			if (err === 'GOOD') {
				let Updated_AD = APPDATA.readADfile();
				res.send(JSON.stringify(Updated_AD));		
			} else {				
				res.send('COMPUTER ERROR');
			}		
		});		
	}
});






ROUTER.post('/controller/emailSave', (req, res) => { console.log(" POST to emailSave" ); 
	const validator = require("email-validator");
	console.log(req.body);
	let email = req.body.email;
	if  ( validator.validate(email) ) {
		const handleEvents = require('../handleEvents.js');
		handleEvents.clearEventsAndUseNewEmail(email);				
		
		let CurrentFullApp_Data = APPDATA.readADfile();		
		CurrentFullApp_Data.EventEmail = email;
		save(CurrentFullApp_Data);
		function save(NextAD) {
			APPDATA.saveAppData(NextAD, (err) => {		
				if (err === 'GOOD') {
					let Updated_AD = APPDATA.readADfile();
					res.send(JSON.stringify(Updated_AD));		
				} else {				
					res.send('COMPUTER ERROR');
				}		
			});		
		}	
	} else {
		res.send("EMAIL INVALID");
	}
});







module.exports = ROUTER;