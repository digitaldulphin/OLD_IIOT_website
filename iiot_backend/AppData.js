	
	const fs = require('fs');
	
	/**
	 * App data holds the customizatble data about this website.
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
    //resetJsonFile();

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










