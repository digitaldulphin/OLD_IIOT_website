import React, { Component } from 'react';
import TheFooter from './components/TheFooter.js';
import TheHeader from './components/TheHeader.js';
import TheMain from './components/TheMain.js';
import caller from './caller.js';
import {
  BrowserRouter as Router,
} from 'react-router-dom';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AppData: false      
    };
  }
  componentDidMount() {   
    caller.GET( '/GetInfo', cb, this   );
    function cb(data, that) {
      var appdata = JSON.parse( data );      
      that.setState({
        AppData: appdata      
      });
    }  
  }
  render() {
    var main = '';
    if(this.state.AppData === false    ){
      main = ' ';
    } else {
      main = <TheMain AppData = {this.state.AppData}  />;
    }
    return (
      <div >        
        <Router>
        <TheHeader />
        {main}
        </Router>            
        <TheFooter />
      </div>
    );
  }
}



export default App;
