import React, { Component } from 'react';
import '../../css/Manageprojects.css';
import uuid from "uuid";
import ProjectLink from '../ProjectLink.js';


class Manageprojects extends Component {
	moveDown = (i ) => {
		var new_index = i +1;
		var old_index = i;
		var arryy = this.props.ProjeInfo;
		if ( new_index >= arryy.length ) 
		{ new_index = 0; }
		arryy.splice(new_index, 0, arryy.splice(old_index, 1)[0]);     
		this.props.changeToProjectsArr(arryy);
		
	}
	moveUp = (i, LName) => {
		var new_index = i - 1;
		var old_index = i;
		var arryy =  this.props.ProjeInfo;
		if ( new_index < 0 ) 
		{ new_index = arryy.length - 1; }
		arryy.splice(new_index, 0, arryy.splice(old_index, 1)[0]);     
		this.props.changeToProjectsArr(arryy);
	}
	delProj = (i) => {
		var arryy =  this.props.ProjeInfo;
		arryy.splice(i, 1);     
		this.props.changeToProjectsArr(arryy);
		
	}
	CreateAnewPRoe = () => {
		var arryy =  this.props.ProjeInfo;
		 
		var pojrrjj = {
			route: 'Initial_Project',
			title: 'Inital Project',
			Description: 'This is the description for the project.',
			img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. ", alt: 'image of a canadian goose.'},
			alt: 'image of dog tracker',
			doc: [{ heading: "This is a heading.", img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }, 
					   { heading: "This is a heading.", img: {ImageName:"goose.jpg", ImageDescription: "This is an image of a goose. "}, paragraphs: [" Lorem ipsum dolor sit ame lamco labo ", " Lorem ipsum dolor sit ame lamco labo "] }]
		};
		arryy.push(pojrrjj);
		this.props.changeToProjectsArr(arryy);
		

	}
  render() {
	var prokssls = this.props.ProjeInfo.map( (p, i) =>
		<ProjectLink 
			key ={uuid.v4()}
			p = {p} 
			pi = {i} 
			OpenModalAlert = {this.props.OpenModalAlert}
			delProj = {this.delProj}
			moveDown = {this.moveDown}
			moveUp = {this.moveUp}
			/>
	);
    return (
        <div className = 'content'>
     		<h2> Manage Projects </h2>
			<div>
				<p>
					Add Project
				</p> 
			</div>			
			<div>
				Select a project to edit or remove.
				<div> {prokssls} </div>
			</div>
			<div>
			<button onClick = {this.CreateAnewPRoe} >Create a New Project</button>
			</div>
        </div>
    );
  }
}


export default Manageprojects;