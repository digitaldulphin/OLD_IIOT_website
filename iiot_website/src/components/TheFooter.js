import React, { Component } from 'react';


class TheFooter extends Component {
  constructor(props) {
    super(props);

  }
  render() {
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
          <h4> Connect </h4>
          <div><a href="#" className ="fa fa-twitter"></a>  <a href="#" className ="fa fa-facebook"></a>   <a href="#" className="fa fa-linkedin"></a> <a href="#" className="fa fa-instagram"></a>  </div>
        </div>
        <div id = 'fdiv'>
          <img src = {require('../images/mohawkLogo.png')} alt="Mohawk College logo." height="50"  ></img>
        </div>
        <div id = 'fdiv' className='signature'>          
            This website was constructed by Norman L. Potts.        
        </div>
      </footer>
    );
  }
}

export default TheFooter;
