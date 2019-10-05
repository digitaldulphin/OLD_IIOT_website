import React, { Component } from 'react';
import '../css/RankListITem.css';
import DisplayEditText from './DisplayEditText.js';



class RankListITem extends Component {
  render() {
    var ooobj = this.props.ooobj;
    var Name = ooobj.Name;    
    var i = this.props.i;
    var LName = this.props.LName;
    var ImportanceLevel = this.props.ooobj.ImportanceLevel;
    var Title = ' '
    if(typeof ooobj.Title !== 'undefined') {        
        Title = ( 
			<DisplayEditText 
				Type= {'Title'}   
				text = {ooobj.Title}  
				saveEdit = {this.props.saveEdit}  
				i = {i}   
				LName = {LName} 
			/>);
    }
    return (
        <div className = 'RankListITem'>
            <div className = 'upperblock' > 
              <div className = 'widthSeventy inlineBlock verticalAlignTop' >
                {Title}   
                {<DisplayEditText 
					Type= {'Name'}   
					text = {Name}  
					saveEdit = {this.props.saveEdit} 
					i = {i}  
					LName = {LName}  
				 />}          
              </div>
              <div className = 'MoveUpDownInList' >
                <div> Move up or down in list. </div>
                <button  onClick= {() => this.props.moveUp(i, LName)} >Up</button>
				        <button  onClick= {() => this.props.moveDown(i, LName)}  >down</button> 
              </div>
            </div>
            <div className = 'ImportanceList'> 
                <label htmlFor="ImportanceLevelList">Importance Level: </label>
                <select 
					id = "ImportanceLevelList" 
					name="ImportanceLevelList" 
					defaultValue = {ImportanceLevel} 
					onChange={ (e) => this.props.ImportanceChange(e, i, LName) } >
					
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button id = 'del' onClick= {() => this.props.delListItem(i, LName)}> Delete </button>
        </div>
    );
  }
}



export default RankListITem;