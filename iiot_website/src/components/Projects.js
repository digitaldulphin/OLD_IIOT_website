import React, { Component } from 'react';
import '../css/projects.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
  } from 'react-router-dom';
  

class Projects extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div id = 'content'>

            <h2> Projects </h2>

            <Link to = '/Project_1' className = 'Project' >
                <h3>Project dog tracker</h3>
                <p>This project is all about tracking dogs at a farm.</p>
            </Link>

            
            <Link  to = '/Project_2'  className = 'Project' >
                <h3>Weather Monitor</h3>
                <p>This project is all about monitoring the weather.</p>
            </Link>

            <a href = '/Project'  className = 'Project' >
                <h3>Project 3</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde sequi quisquam magni, aliquam assumenda cum quae, ex numquam officia voluptatem libero neque impedit magnam iusto quaerat enim eos non itaque.</p>
            </a>


            <a  href = '/Project'  className = 'Project' >
                <h3>Project 4</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt accusantium, mollitia facere aliquid magnam cumque accusamus unde distinctio eius. Accusamus harum incidunt quia nulla consequatur ipsam. Ex deserunt vero quod?</p>
            </a>

            <a  href = '/Project'  className = 'Project' >
                <h3>Project 5</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti obcaecati non eum numquam, dolorum tempore temporibus aliquam ratione eveniet debitis repellat enim error pariatur, magnam dignissimos necessitatibus nesciunt nam earum.</p>
            </a>


            <a  href = '/Project'  className = 'Project' >
                <h3>Project 6</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo atque sit iusto dolorem nemo quod ipsam vero, saepe minima rem ut, sunt, quidem accusantium! Numquam cupiditate excepturi autem magnam veniam!</p>
            </a>

        </div>
    );
  }
}

export default Projects;
