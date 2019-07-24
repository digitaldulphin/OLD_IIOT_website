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
          <div>New Ewing</div>
          <div>Room E202 </div>
        </div>
        <div id = 'fdiv'>
          <h4>Contact</h4>
          <div>Norman Potts</div>
          <div>519 750 4577</div>
          <div>storminnormanpotts@hotmail.com</div>
        </div>
        <div id = 'fdiv'>
          <h4> Connect </h4>
          <div><a href="#" class="fa fa-twitter"></a>  <a href="#" class="fa fa-facebook"></a>   <a href="#" class="fa fa-linkedin"></a> <a href="#" class="fa fa-instagram"></a>  </div>
        </div>
      </footer>
    );
  }
}

export default TheFooter;
