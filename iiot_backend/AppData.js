	
	const fs = require('fs');
	

	/*
		AppData is a object that olds the customizeable data for the frontend website. 
		The admin can login to the backend  and edit this array using the CRUD.
		The object has four main properties. Each holds customizeable data for 
		the four pages on the frontend. In the future more properties could be 
		added... 
		
		The AboutPage property. holds an object with slide show img name and
		a propety for document. Slide show img name must have the name and file
		extentsion. File location is determine later.
		The document has the same format as the projects document. It is an 
		array of sections. A section is an object. With the properties heading,
		img, and paragraphs. Heading is mandatory img can be left blank, 
		paragraphs is an array of strings. Each paragraph string goes inside a 
		p tag.
		
		The projects propety is used to create links on the projects page 
		and fills the selected project page. The project property is an array 
		for each project. Each project contains route, title, description, img, 
		alt. Those properties create the project link and are later used on the
		project page and get followed by the document.
		
		PeoplePage propety. For the people page. contains two arrays, PeopleList 
		and SponsorList. People List contains the name of the person title, 
		and importance level. the importance level determines how high someone
		appears in the list and gives them a bolder and larget font size. There 
		are only five levels of importance, 1 to 5. One most important 5 least.
		The sponsor list is similar to peoples list, importance works the same
		way. No title property but a logo property may get added later.
		
		EventsList propety. Simply contains the list of events created from the
		outlook calender email api thing. Once that thing is connected it will 
		pull events from the outlook email api and store them here. The email
		used will be stored in a separate file. 
		
		Currently this array is static for development. Eventually it will be 
		managed by the CRUD interface, and be saved as a JSON file for 
		remembering data between system restarts. 
		
		Below is the default array used for development and start over. 
		
	var AppData = {
		AboutPage: {  
			SlideShowImg: 'img1.jpg',
			document: [{ heading: "Section 1", img: "goose.jpg", paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }, 
					   { heading: "Section 2", img: "goose", paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }]
		},
		projects:  [ {
				route: 'Project_1',
				title: 'Project Dog Tracker',
				Description: 'This project is all about tracking dogs at a farm.',
				img: 'goose.jpg',
				alt: 'image of dog tracker',
				document: [{ heading: "Project 1", img: "goose.jpg", paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }, 
						   { heading: "Project 2", img: "goose.jpg", paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }]
			},{
				route: 'Project_1',
				title: 'Project Dog Tracker',
				Description: 'This project is all about tracking dogs at a farm.',
				img: 'goose.jpg',
				alt: 'image of dog tracker',
				document: [{ heading: "Project 1", img: "goose.jpg", paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }, 
						   { heading: "Project 2", img: "goose.jpg", paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }]
			} 
		],
		PeoplePage: {
			PeopleList: [
				{ Name:"Norman Potts", Title:"Web Devoper & Programmer", ImportanceLevel:1 },
				{ Name:"Norman Potts", Title:"Web Devoper & Programmer", ImportanceLevel:2 },
				{ Name:"Norman Potts", Title:"Programmer", ImportanceLevel:3 },
				{ Name:"Norman Potts", Title:"Student", ImportanceLevel:4 },
				{ Name:"Norman Potts", Title:"Student", ImportanceLevel:5 }
			],
			SponsorsList: [
				{ Name:"Candian Tire", ImportanceLevel:1 },
				{ Name:"IBM", ImportanceLevel:1 }
			],
		},
		EventList: [
			{ title: 'Summer School Sign Up ', date: '2019-08-27' , st:'14:30:00', et:'10:00:00', description: 'This would be the description. Blah BLah Blah. It is time to sign up for summer school.' },
			{ title: 'Pizza Day', date: '2019-08-28', st:'15:30:00', et:'09:00:00', description: 'This would be the description. Blah Blah Blah. Pizza is yummy.' }
		]
	};
	
	*/

 
	const Original = {
		AboutPage: {  
			SlideShowImg: {ImageName:"img1.jpg", ImageDescription: "The Joyce Center, For Partnership & Innovation. ", alt: 'image of dog tracker'},
			doc: [{ heading: "Section 1", img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: ["  paragraph 1", "  paragraph 2 "] }, 
					   { heading: "Section 2", img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: [" paragraph 1 ", " paragraph 2  "] }]
		},
		projects:  [ {
				route: 'Project_1',
				title: 'Project Weather thingy',
				Description: 'Students made a weather thinggy.',
				img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. ", alt: 'image of dog tracker'},				
				doc: [{ heading: "Project 1", img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }, 
						   { heading: "Project 2", img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }]
			},{
				route: 'Project_1',
				title: 'Project Dog Tracker',
				Description: 'This project is all about tracking dogs at a farm.',
				img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. ", alt: 'image of dog tracker'},				
				doc: [{ heading: "Project 1", img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }, 
						   { heading: "Project 2", img:{ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }]
			} 
		],
		PeoplePage: {
			PeopleList: [
				{ Name:"Norman Potts", Title:"Web Devoper & Programmer", ImportanceLevel:1 },
				{ Name:"Norman Potts", Title:"Web Devoper & Programmer", ImportanceLevel:2 },
				{ Name:"Norman Potts", Title:"Programmer", ImportanceLevel:3 },
				{ Name:"Norman Potts", Title:"Student", ImportanceLevel:4 },
				{ Name:"Norman Potts", Title:"Student", ImportanceLevel:5 }
			],
			SponsorsList: [
				{ Name:"Candian Tire", ImportanceLevel:1 },
				{ Name:"IBM", ImportanceLevel:1 }
			],
		},
		EventList: [
			{ title: 'Summer School Sign Up ', date: '2019-08-27' , st:'14:30:00', et:'10:00:00', description: 'This would be the description. Blah BLah Blah. It is time to sign up for summer school.' },
			{ title: 'Pizza Day', date: '2019-08-28', st:'15:30:00', et:'09:00:00', description: 'This would be the description. Blah Blah Blah. Pizza is yummy.' }
		]		
	};



	


	function readADfile( ) {	 
		var AD = JSON.parse(fs.readFileSync('./AppData.json', 'utf8'));		
		return AD;		  
	}
	
	 


	function saveAppData( aD, cb ) {		
		const jsonContent = JSON.stringify(aD);
		fs.writeFileSync("./AppData.json", jsonContent, 'utf8' );
		cb('GOOD');			 
	}	

	function resetJsonFile() { console.log("resetJsonFile");
		saveAppData(Original, (v) => { console.log(v); });
	}
    resetJsonFile();

	function RemoveAnImage(name) {
		try {
			var path = `./images/${name}`;
			fs.unlinkSync(path);  
		}catch(e) {
			return;
		}
	}
 
	
module.exports = { 	
	Default:Original,
	readADfile:readADfile,
	saveAppData:saveAppData,
	RemoveAnImage:RemoveAnImage
};










