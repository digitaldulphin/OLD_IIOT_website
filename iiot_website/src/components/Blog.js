import React, { Component } from 'react';
import '../css/blog.css';

class Blog extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div id = 'content'>
     	<h2> Blog </h2>
		<p>
			The Blog.
		</p>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas veritatis laboriosam officiis voluptatem necessitatibus obcaecati quia dicta. Vel laborum earum architecto consectetur, dolore modi. Numquam quia culpa nobis omnis earum.
		</p>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas veritatis laboriosam officiis voluptatem necessitatibus obcaecati quia dicta. Vel laborum earum architecto consectetur, dolore modi. Numquam quia culpa nobis omnis earum.
		</p>
        </div>
    );
  }
}

export default Blog;
