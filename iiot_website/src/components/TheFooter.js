import React, { Component } from 'react';
import MYImg from './MYImg.js';

class TheFooter extends Component {
	render() {
	  var ImageName = 'mohawkLogoo.png';
	  var img = <MYImg ImageName = {ImageName} ImageDescription = {'Mohawk College Logo'} />;
		
    return (
      <footer>
        <div id = 'fdiv'>
          <h4>Location</h4>
          <div>Mohawk College Fennel Campus</div>
          <div>The Joyce Centre for Partnership & Innovation </div>
          <div>Room EA 310 </div>
          <div> 135 Fennell Aveune West, Hamilton, ON, L9C 7V7 </div>
        </div>
        <div id = 'fdiv'>
          <h4>Contact</h4>
          <div>mohawkIOT@mohawkcollege.ca</div>
        </div>
      
        <div id = 'fdiv'>          
            <a href = 'https://www.mohawkcollege.ca/' id = 'MohawkCollegeLink' title = "Go to Mohawk College Home Page." >
			{img}
            </a>
        </div>
        <div id = 'fdiv' className='signature'>          
            This website was constructed by Norman L. Potts.        
        </div>
      </footer>
    );
  }
}

export default TheFooter;
