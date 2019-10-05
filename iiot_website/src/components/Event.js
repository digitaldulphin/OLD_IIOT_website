import React, { Component } from 'react';
 
class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      des:false,
      titleHov: false 
    };
  }
  showDescription = () => {
    if ( this.state.des == true ) {
      this.setState({ des:false  });
    } else {
      this.setState({ des:true });
    }
  } 
  onMouseEnter = () => this.setState({ titleHov:true });
  onMouseLeave = () => this.setState({ titleHov:false }); 
  render() {
    var eve = this.props.eve;
    var des;
    var tUp = '△'; var tDown = '▽';
    var AtriangleCLS = 'Atriangle';

    if (this.state.des == true) {
        AtriangleCLS = 'Atriangle titleHover';
        des = (
          <div>
            <div className = 'eTitle titleHover' onClick = {this.showDescription} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
              {eve.title} - {eve.date}   <span  className = {AtriangleCLS} > {tUp} </span>
            </div>  
            <div className = "eDescription"  > 
              Start Time: {eve.st} - End Time: {eve.et} <br />
              {eve.description} 
            </div>
          </div>
        );
    } else {
      var titleCLS = '';
      if (this.state.titleHov == true) {
        titleCLS = 'eTitle titleHover';
        AtriangleCLS = 'Atriangle titleHover';
      } else {
        titleCLS = 'eTitle nottitleHover';
        AtriangleCLS = 'Atriangle nottitleHover';
      }
      des = (
        <div className = {titleCLS} onClick = {this.showDescription} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
          {eve.title} - {eve.date} <span className = {AtriangleCLS} > {tDown} </span>
        </div>  
      );
    }

    return (
		  <li>  {des} 	</li>
    );
  }
}

export default Event;
